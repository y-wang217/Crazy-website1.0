import { CONTACT } from "@/content/site";
import { Wordmark } from "./Brand";

export default function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1200px] px-4 pb-10 pt-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft">
            Personalized 1-on-1 online tutoring for Ontario grade 11 and 12 students.
          </p>
        </div>
        <div className="grid gap-1.5 text-[15px] text-ink-soft">
          <a href={CONTACT.phoneHref} className="font-semibold text-ink hover:text-blue">{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-blue">{CONTACT.email}</a>
          <a href="#book" className="hover:text-blue">Book a free trial lesson</a>
        </div>
      </div>
      <p className="mt-10 text-[13px] text-ink-faint">© {new Date().getFullYear()} AP Academy. Live online lessons across Ontario.</p>
    </footer>
  );
}
