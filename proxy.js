import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // If user is not email verified and trying to access dashboard
    // Redirect them to verify page
    if (pathname.startsWith("/dashboard") && token && !token.emailVerified) {
      return NextResponse.redirect(new URL("/register/verify", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/products/:path*",
    "/api/stock-adjustments/:path*",
    "/api/settings/:path*",
    "/api/auth/users/:path*",
    "/api/auth/registerBusiness/verify/:path*",
  ],
};
