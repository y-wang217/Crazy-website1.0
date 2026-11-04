# AP Academy website (redesign prototype)

Homepage prototype for AP Academy. Next.js 16, React 19, Tailwind 4, the same stack as the current site.

```bash
npm install
npm run dev        # http://localhost:3000
```

- All business copy lives in `content/site.ts`, with a source note for each block.
- Photo slots marked **Placeholder** need real AP Academy photos before launch.
- The booking form opens a prefilled email until `BOOKING_ENDPOINT` in `content/site.ts` is set.
