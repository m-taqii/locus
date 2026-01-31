import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {

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
  ],
};