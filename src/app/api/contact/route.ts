export const runtime = "nodejs";
export async function POST(request: Request) {
 const fail = (status:number) => Response.json({ok:false},{status});
 const origin=request.headers.get("origin");
 if(!origin || origin !== new URL(request.url).origin)return fail(403);
 if(!request.headers.get("content-type")?.startsWith("application/json"))return fail(415);
 // Bound the stream itself, including requests without Content-Length.
 const reader=request.body?.getReader();if(!reader)return fail(400);
 let raw="",bytes=0;const decoder=new TextDecoder();
 try {while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>24000){await reader.cancel();return fail(413);}raw+=decoder.decode(value,{stream:true});}raw+=decoder.decode();}catch{return fail(400);}
 let data: Record<string, unknown>;
 try{const parsed=JSON.parse(raw);if(!parsed || typeof parsed!=="object" || Array.isArray(parsed))return fail(400);data=parsed;}catch{return fail(400);}
 const field=(key:string)=>typeof data[key]==="string" ? (data[key] as string).trim() : "";
 if(field("website"))return fail(400);
 const name=field("name"),email=field("email"),organisation=field("organisation"),message=field("message");
 if(!name || name.length>100 || /[\r\n]/.test(name) || email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || organisation.length>150 || message.length<10 || message.length>5000)return fail(400);
 const {MAILGUN_API_KEY:key,MAILGUN_DOMAIN:domain,MAILGUN_FROM:from,CONTACT_TO:to}=process.env;
 if(!key || !domain || !from || !to)return fail(503);
 const recipients=to.split(",").map(value=>value.trim()).filter(Boolean);
 if(!recipients.length || recipients.some(value=>! /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/.test(value)))return fail(503);
 const body=new FormData();body.set("from",from);for(const recipient of recipients)body.append("to",recipient);body.set("subject","Viva! — Nuova richiesta dal sito");body.set("h:Reply-To",email);body.set("text",`Nome: ${name}\nEmail: ${email}\nOrganizzazione: ${organisation || "—"}\n\n${message}`);body.set("o:tracking","no");body.set("o:tracking-clicks","no");body.set("o:tracking-opens","no");
 const host=process.env.MAILGUN_REGION === "EU" ? "api.eu.mailgun.net" : "api.mailgun.net";
 try{const response=await fetch(`https://${host}/v3/${encodeURIComponent(domain)}/messages`,{method:"POST",headers:{Authorization:`Basic ${Buffer.from(`api:${key}`).toString("base64")}`},body,signal:AbortSignal.timeout(15000)});if(!response.ok)return fail(502);return Response.json({ok:true});}catch{return fail(502);}
}
