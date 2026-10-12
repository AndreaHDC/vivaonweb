export async function verifyRecaptcha(token: string, hostname: string): Promise<boolean> {
 const secret = process.env.RECAPTCHA_SECRET_KEY;
 if (!secret || !token || token.length > 4096) return false;
 const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
  method: "POST",
  body: new URLSearchParams({ secret, response: token }),
  signal: AbortSignal.timeout(10000),
  cache: "no-store",
 });
 if (!response.ok) return false;
 const result = await response.json();
 const age = Date.now() - Date.parse(result.challenge_ts);
 return result.success === true && result.action === "contact_submit"
  && result.hostname === hostname && typeof result.score === "number"
  && result.score >= 0.5 && result.score <= 1 && age >= -10000 && age <= 120000
  && !result["error-codes"]?.length;
}
