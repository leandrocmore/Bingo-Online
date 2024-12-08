import { NextAuthMiddlewareOptions, NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = (request: NextRequestWithAuth) => {
console.log('[ middlewaer nextAuth token]:',request.nextauth.token);

const pathName = request.nextUrl.pathname;
  console.log('[ teste do  Pathname ]:', pathName);

const  isPrivateRoutes = request.nextUrl.pathname.startsWith("/api/users/v1/");
const  isadminUser = request.nextauth.token?.role === 'admin';
console.log("[teste de verificacao ]"," rota /api/users/v1/ ", isPrivateRoutes ,"admin", isadminUser)
if ( isPrivateRoutes && !isadminUser) {
    return console.log("true [middlewaer virificacao de role ]"),isadminUser,isPrivateRoutes, NextResponse.rewrite(new URL("/pages/error/",request.url))
}
}

const callbacksOptions: NextAuthMiddlewareOptions = {}

export default withAuth(middleware,callbacksOptions)

export const config = {
  matcher: [
    '/api/users/v1/:path*',
    '/Controle/:path*'
  ]
};