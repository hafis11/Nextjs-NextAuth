import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { verifyAuth } from "./src/lib/auth";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    // console.log(req.nextauth.token);
    const token = await verifyAuth(req);

    if (token.role === "knowit_admin") {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.next();
      } else {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    if (token.role === "knowit_student") {
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.next();
      } else {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  },
  {
    callbacks: {
      authorized: async ({ req }) => {
        const token = await verifyAuth(req);
        if (
          token?.role === "knowit_admin" ||
          token?.role === "knowit_student"
        ) {
          return true;
        }
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
  runtime: "experimental-edge",
};
