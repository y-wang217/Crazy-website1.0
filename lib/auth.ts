// =============================================================================
// Student and parent login: INTEGRATION POINT for Charlie's existing Magic Link
// =============================================================================
//
// The login popup (components/LoginDialog.tsx) is the new design's front end for
// the Magic Link sign-in AP Academy already runs. It calls
// `requestLoginLink(...)` and renders whatever status comes back. It never
// decides on its own that someone is signed in and never shows student data.
//
// TODAY (before migration): nothing is connected. `requestLoginLink` makes no
// network request, sends no email, stores nothing and does not read the email.
// The popup shows "Student portal login is being updated. Please check back soon."
//
// AT MIGRATION, when this design replaces the current site inside the
// ap-academy-landing workspace, connect it to the EXISTING flow, unchanged.
// That flow lives in apps/landing/app/login/login-form.tsx and does this:
//
//   import { getBrowserClient } from "@ap-academy/db/browser";
//   const supabase = getBrowserClient();          // null when env is not set
//   if (!supabase) return { status: "not_connected" };
//   const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
//   const { error } = await supabase.auth.signInWithOtp({
//     email,
//     options: {
//       emailRedirectTo: redirectTo,
//       // Read by the handle_new_user trigger and re-checked by the callback.
//       data: { marketing_consent: marketingConsent },
//     },
//   });
//   return error ? { status: "error", message: error.message } : { status: "sent" };
//
// Paste that in place of the body below. Nothing else changes: the existing
// /auth/callback route exchanges the code for a session, `safeNextPath` keeps
// `next` same-origin, and what each person can see is still decided by the
// Student Tracker's memberships and parent links (RLS), not by signing in.
//
// Two things the existing form has that this popup leaves to Charlie:
//   - Marketing consent (CASL). The current login page has an optional,
//     unchecked "marketing consent" checkbox. This popup sends `false`, which is
//     what the existing form sends when the box is left unticked. Add the
//     checkbox to the popup if consent should still be collected at login.
//   - The `?error=link` notice for an expired link. The callback redirects to
//     /login?error=link; keep that page, or point the redirect at a page that
//     opens this popup with the notice.
// =============================================================================

export type LoginRequestResult =
  | { status: "sent" } // the Magic Link email was sent
  | { status: "not_connected" } // not wired to the Magic Link system yet
  | { status: "error"; message?: string }; // the auth service returned an error

export type LoginRequest = {
  email: string;
  /** Where to land after the link is opened. Same-origin path, e.g. "/tracker". */
  next?: string;
  /** CASL consent; false matches the existing form's unticked default. */
  marketingConsent?: boolean;
};

export async function requestLoginLink(request: LoginRequest): Promise<LoginRequestResult> {
  void request; // intentionally unused until connected to the existing Magic Link flow
  return { status: "not_connected" };
}
