"use client";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/content/translations";
export function ContactForm({ locale }: { locale: Locale }) {
 const it = locale === "it";
 const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault(); if(status === "sending") return;
  const form=event.currentTarget; const values=new FormData(form); setStatus("sending");
  try { const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(values))}); if(!response.ok)throw new Error(); setStatus("success");form.reset(); } catch {setStatus("error");}
 }
 return <form className="contact-form" onSubmit={submit} aria-busy={status === "sending"}>
  <div className="contact-fields"><label>{it?"Nome":"Name"}<input name="name" autoComplete="name" required maxLength={100}/></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254}/></label></div>
  <label>{it?"Organizzazione (facoltativo)":"Organisation (optional)"}<input name="organisation" autoComplete="organization" maxLength={150}/></label>
  <label>{it?"Raccontaci la tua idea":"Tell us about your idea"}<textarea name="message" required minLength={10} maxLength={5000} rows={6}/></label>
  <div className="contact-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
  <p className="contact-form-note">{it?"Usiamo i dati che ci invii per rispondere alla tua richiesta. Il modulo inoltra il messaggio via email, senza salvarlo in un database del sito.":"We use the information you send to respond to your enquiry. This form forwards your message by email without saving it in a website database."}</p>
  <button className="contact-submit" disabled={status === "sending"} type="submit">{status === "sending" ? (it?"Invio in corso…":"Sending…") : (it?"Invia il messaggio":"Send message")} <span aria-hidden="true">↗</span></button>
  <p role="status" aria-live="polite">{status === "success" ? (it?"Grazie! Il messaggio è stato inviato.":"Thank you! Your message has been sent.") : status === "error" ? (it?"Il messaggio non è stato inviato. Riprova più tardi; il testo è ancora qui.":"Your message was not sent. Please try again later; your text is still here.") : ""}</p>
 </form>;
}
