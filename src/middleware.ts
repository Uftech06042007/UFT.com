import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Redirect the www host to the canonical apex domain so the site is served
// from a single URL (kills the www duplicate-content issue). Only the exact
// www host is matched — apex, *.vercel.app preview URLs, and localhost pass
// through untouched.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  if (host === "www.uftech.com") {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "uftech.com";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
