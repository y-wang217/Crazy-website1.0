// PUBLIC preview of one student's learning record.
//
// Everything in this file is bundled into the page and sent to every visitor.
// Only information already approved for publication may go here. Never copy
// lesson notes, teacher feedback, homework, names, schools or anything else
// from the Notion Lessons log or the Student Tracker into this file.
//
// Source of the current entry: the public roster on the current site
// (y-wang217/ap-academy-landing, apps/landing/content/students.ts, student 9,
// roster updated Oct 5, 2026). That file is itself copied by hand from the
// Notion lesson log and only lists initials, logged test scores and the
// teacher's public status line.
//
// Full lesson history stays in the AP Academy portal (apacademy.ca/tracker),
// behind sign-in, and is never fetched by this site. `progress-public.test.ts`
// fails the build check if a subject lists more than PUBLIC_LESSON_LIMIT
// entries or an entry carries a field outside the public shape.

export const PUBLIC_LESSON_LIMIT = 4;

export type PublicLessonEntry = {
  date: string; // "May 3, 2026": the lesson the score was logged on
  course: string; // "SPH3U"
  score: number | null; // logged test score, percent; null when none was logged
  // A short summary Charlie has approved for the public site. null until one is
  // approved; the page then shows a clearly labelled placeholder.
  summary: string | null;
};

export type SubjectKey = "physics" | "chemistry" | "biology" | "calculus";

export type PublicSubjectRecord = {
  subject: SubjectKey;
  title: string; // "Grade 11 Physics"
  courseCode: string; // "SPH3U"
  entries: PublicLessonEntry[]; // newest first, at most PUBLIC_LESSON_LIMIT
};

export type PublicStudentPreview = {
  initials: string;
  lessonsLogged: number; // all subjects
  since: string; // "May 2026"
  latestNote: { text: string; date: string } | null; // the public status line
  records: PublicSubjectRecord[];
};

// The tabs shown in the preview. A tab is only interactive when the student has a record for it.
export const SUBJECT_TABS: { key: SubjectKey; label: string }[] = [
  { key: "physics", label: "Physics" },
  { key: "chemistry", label: "Chemistry" },
  { key: "biology", label: "Biology" },
  { key: "calculus", label: "Calculus" },
];

export const PREVIEW_STUDENT: PublicStudentPreview = {
  initials: "D.B.",
  lessonsLogged: 13,
  since: "May 2026",
  latestNote: {
    text: "Signed off as ready for the physics exam in June. Now in grade 12 chemistry with an organic naming assessment in two weeks: this week's practice mixes every functional group covered so far.",
    date: "Oct 4, 2026",
  },
  records: [
    {
      subject: "physics",
      title: "Grade 11 Physics",
      courseCode: "SPH3U",
      entries: [
        { date: "Jun 7, 2026", course: "SPH3U", score: 93, summary: null },
        { date: "May 24, 2026", course: "SPH3U", score: 93, summary: null },
        { date: "May 10, 2026", course: "SPH3U", score: 88, summary: null },
        { date: "May 3, 2026", course: "SPH3U", score: 82, summary: null },
      ],
    },
    {
      subject: "chemistry",
      title: "Grade 11 Chemistry",
      courseCode: "SCH3U",
      entries: [{ date: "May 7, 2026", course: "SCH3U", score: 95, summary: null }],
    },
  ],
};

/** First and latest logged score in a record, only when there are two to compare. */
export function improvement(record: PublicSubjectRecord) {
  const scored = record.entries.filter((e) => e.score !== null);
  if (scored.length < 2) return null;
  const latest = scored[0];
  const first = scored[scored.length - 1];
  return { first, latest, points: latest.score! - first.score! };
}
