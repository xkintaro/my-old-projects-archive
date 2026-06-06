import { NextResponse } from "next/server";
import { auth } from "@/core/auth/auth";
import { coreRoutePermissions, hasPermission } from "@/core/auth/permissions";

export const config = {
  matcher: ["/admin/:path*"],
};

export default auth((req) => {

  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;

  const permissions = req.auth?.user?.permissions || [];

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  const path = nextUrl.pathname;

  for (const [route, requiredPerm] of Object.entries(coreRoutePermissions)) {

    if (path.startsWith(route)) {

      if (!hasPermission(permissions, requiredPerm)) {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }

      return NextResponse.next();
    }

  }

  if (path.startsWith("/admin/")) {

    const moduleName = path.split("/")[2];

    if (moduleName) {

      const requiredPerm = `${moduleName}:view`;

      if (!hasPermission(permissions, requiredPerm)) {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }

    }

  }

  return NextResponse.next();

});