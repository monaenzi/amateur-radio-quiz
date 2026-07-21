import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = req.nextUrl.pathname === '/login'
  const isHomeRoute = req.nextUrl.pathname === '/'
  const isExamRoute =
    req.nextUrl.pathname.startsWith('/examSimulation') ||
    req.nextUrl.pathname.startsWith('/examResults')
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.role === 'ADMIN'

  if (isAdminRoute && (!isLoggedIn || !isAdmin)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if ((isLoginRoute || isHomeRoute) && isLoggedIn) {
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (isExamRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/exam_locked', req.url))
  }
})

export const config = {
  matcher: ['/admin/:path*', '/login', '/', '/examSimulation/:path*', '/examResults/:path*'],
}