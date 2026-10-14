import { NextResponse, type NextRequest } from "next/server";

// Unmatched routes bypass both root layouts; retain their URL's language.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  headers.set("x-viva-locale", path === "/en" || path.startsWith("/en/") ? "en" : "it");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: "/((?!api(?:/|$)|_next(?:/|$)|brand/|hero/|projects/|services/).*)",
};
