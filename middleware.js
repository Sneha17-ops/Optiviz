import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId, redirectToSignIn } = auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
});