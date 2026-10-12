"use client";
import Script from "next/script";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/content/translations";
declare global {
 interface Window { grecaptcha?: { ready: (callback: () => void) => void; execute: (key: string, options: { action: string }) => Promise<string> }; }
}
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
function getToken(): Promise<string> {
 return new Promise((resolve, reject) => {
  const captcha = window.grecaptcha;
  if (!siteKey || !captcha) { reject(new Error("Verification unavailable")); return; }
  const timeout = window.setTimeout(() => reject(new Error("Verification timed out")), 10000);
  captcha.ready(() => {
   captcha.execute(siteKey, { action: "contact_submit" }).then(resolve, reject).finally(() => clearTimeout(timeout));
  });
 });
}
export function ContactForm({ locale }: { locale: Locale }) {
 const it = locale === "it";
 const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault(); if(status === "sending") return;
  const form=event.currentTarget; const values=new FormData(form); setStatus("sending");
  try { const recaptchaToken = await getToken(); const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...Object.fromEntries(values), recaptchaToken})}); if(!response.ok)throw new Error(); setStatus("success");form.reset(); } catch {setStatus("error");}
 }
 return <>
 {siteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`} strategy="afterInteractive" />}
 <div className="contact-form-container"><form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
  <p className="contact-form-note">{it?"Nome, email e messaggio sono obbligatori.":"Name, email and message are required."}</p>
  <div className="contact-fields"><label>{it?"Nome":"Name"}<input name="name" autoComplete="name" required maxLength={100}/></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254}/></label></div>
  <label>{it?"Organizzazione (facoltativo)":"Organisation (optional)"}<input name="organisation" autoComplete="organization" maxLength={150}/></label>
  <label>{it?"Raccontaci la tua idea":"Tell us about your idea"}<textarea aria-describedby="message-help" name="message" required minLength={10} maxLength={5000} rows={6}/></label><p id="message-help" className="contact-form-note">{it?"Da 10 a 5.000 caratteri.":"Between 10 and 5,000 characters."}</p>
  <div className="contact-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
  <p className="contact-form-note">{it?"Usiamo i dati che ci invii per rispondere alla tua richiesta. Il modulo inoltra il messaggio via email, senza salvarlo in un database del sito.":"We use the information you send to respond to your enquiry. This form forwards your message by email without saving it in a website database."}</p>
  <button className="contact-submit" disabled={status === "sending"} type="submit">{status === "sending" ? (it?"Invio in corso…":"Sending…") : (it?"Invia il messaggio":"Send message")} <span aria-hidden="true">↗</span></button>
  <p role="status" aria-live="polite">{status === "success" ? (it?"Grazie! Il messaggio è stato inviato.":"Thank you! Your message has been sent.") : status === "error" ? (it?"Il messaggio non è stato inviato. Riprova più tardi; il testo è ancora qui.":"Your message was not sent. Please try again later; your text is still here.") : ""}</p>
 </form>
 <p className="recaptcha-notice">{it ? "Questo sito è protetto da reCAPTCHA. Si applicano la " : "This site is protected by reCAPTCHA. The Google "}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{it ? " e i " : " and "}<a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">{it ? "Termini di servizio" : "Terms of Service"}</a>{it ? " di Google." : " apply."}</p>
 </div></>;
}
