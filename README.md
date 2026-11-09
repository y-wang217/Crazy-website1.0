# AP Academy website (redesign prototype)

Homepage prototype for AP Academy. Next.js 16, React 19, Tailwind 4, the same stack as the current site.

```bash
npm install
npm run dev        # http://localhost:3000
```

- All business copy lives in `content/site.ts`, with a source note for each block.
- Photo slots marked **Placeholder** need real AP Academy photos before launch.
- The booking form opens a prefilled email until `BOOKING_ENDPOINT` in `content/site.ts` is set.

## Student and parent login

The header "Log in" button opens a login popup (`components/LoginDialog.tsx`).
It is frontend only: no backend is connected, nothing typed is sent or stored,
and submitting shows "Student portal login is being updated." To connect a
real magic-link or one-time-code sign-in, replace `requestLoginLink` in
`lib/auth.ts`; the comments there walk through it.
