import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { isAdmin } from "@/lib/admin"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/verify", "/subscribe", "/success"]
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith("/api/auth"))

  // API routes that should not be handled by this middleware
  if (pathname.startsWith("/api/stripe/webhook")) {
    return NextResponse.next()
  }

  // Check authentication for protected routes
  if (pathname.startsWith("/app") && !isPublicRoute) {
    const user = await getSession()

    if (!user) {
      console.log("[v0] Middleware: No user session, redirecting to /login")
      return NextResponse.redirect(new URL("/login", request.url))
    }

    console.log("[v0] Middleware: User authenticated:", { id: user.id, email: user.email, role: user.role })

    // Admin panel access check
    if (pathname.startsWith("/app/admin")) {
      const hasAdminAccess = await isAdmin(user.email)

      if (!hasAdminAccess) {
        console.log("[v0] Middleware: User is not admin, redirecting to /app")
        return NextResponse.redirect(new URL("/app", request.url))
      }

      console.log("[v0] Middleware: Admin access granted")
      // Admins don't need subscription check for admin panel
      return NextResponse.next()
    }

    // Admins have full access to all /app routes without subscription
    if (user.role === "ADMIN") {
      console.log("[v0] Middleware: Admin user, granting access without subscription check")
      return NextResponse.next()
    }

    // Check subscription status for regular users
    const hasActiveSubscription =
      user.subscription && user.subscription.status === "active" && user.subscription.currentPeriodEnd > new Date()

    if (!hasActiveSubscription) {
      console.log("[v0] Middleware: User has no active subscription, redirecting to /subscribe")
      return NextResponse.redirect(new URL("/subscribe", request.url))
    }

    console.log("[v0] Middleware: User has active subscription, granting access")
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$).*)",
  ],
}
