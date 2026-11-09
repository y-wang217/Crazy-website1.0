// =============================================================================
// Student and parent login: INTEGRATION POINT for Charlie's auth backend
// =============================================================================
//
// The login popup (components/LoginDialog.tsx) calls `requestLoginLink(email)`
// and renders whatever status comes back. It never decides on its own that a
// login succeeded, and it never shows student data.
//
// TODAY: no backend is connected. `requestLoginLink` makes no network request,
// stores nothing and does not read the email. The popup shows
// "Student portal login is being updated. Please check back soon."
//
// TO CONNECT (magic link or one-time code):
//   1. Replace the body of `requestLoginLink` with the call that asks your auth
//      service to email a sign-in link or code, for example with Supabase:
//        const { error } = await supabase.auth.signInWithOtp({
//          email,
//          options: { shouldCreateUser: false, emailRedirectTo: `${location.origin}/auth/callback` },
//        });
//        return error ? { status: "error" } : { status: "sent" };
//      `shouldCreateUser: false` matters: an unknown email must never create an
//      account. Access to records comes only from the links the owner sets up.
//   2. Return { status: "sent" } whether or not the email is enrolled, so the
//      popup never reveals who is a student.
//   3. If you use a one-time code instead of a link, add a code step to the
//      popup that calls a second function here (e.g. `verifyLoginCode`).
//   4. The page the link lands on (the dashboard) is responsible for checking
//      the session and permissions. Nothing on this public site grants access.
// =============================================================================

export type LoginRequestResult =
  | { status: "sent" } // a link or code was emailed (or the address is unknown: same answer)
  | { status: "not_connected" } // no backend yet
  | { status: "error" }; // the backend failed; ask the person to try again

export async function requestLoginLink(email: string): Promise<LoginRequestResult> {
  void email; // intentionally unused until a real, approved backend is connected
  return { status: "not_connected" };
}
