// AP Academy homepage content.
//
// Every fact here comes from one of two places, noted per block:
//   - the current site (y-wang217/ap-academy-landing, apps/landing: app/config.ts,
//     content/offer.ts, content/methods.ts, components/Credentials.tsx)
//   - Notion Business HQ (Records / Teachers Tracker, Playbook)
// Do not add results, testimonials, admission claims or credentials that are not
// in one of those sources.

export const CONTACT = {
  phone: "519-589-8217",
  phoneHref: "tel:+15195898217",
  email: "y.wang217@gmail.com",
  // 30-minute call with Mr. Charlie (current site's booking link).
  calendly: "https://calendly.com/y-wang217/30min",
};

// Student and parent sign-in lives in lib/auth.ts (the login popup's integration point).

// Where the booking form sends its data. Paste a form endpoint that accepts a
// JSON POST (for example a Formspree form URL). While empty, the form opens a
// prefilled email to CONTACT.email instead.
export const BOOKING_ENDPOINT = "";

// Source: content/offer.ts and app/config.ts PRICING on the current site.
export const PRICING = {
  hourly: 60,
  intensive: 600,
  intensiveLesson1: 70,
  intensiveLessons: 10,
};

export type Subject = {
  name: string;
  codes: string;
  blurb: string;
  topics: string[];
  doodle: "functions" | "calculus" | "physics";
  flagship?: boolean;
};

// Featured subjects. Topics are Ontario curriculum strand names.
export const FEATURED_SUBJECTS: Subject[] = [
  {
    name: "Advanced Functions",
    codes: "MHF4U",
    blurb:
      "Our flagship course, and the one most programs ask for. We take it apart topic by topic until every question type feels familiar.",
    topics: [
      "Exponential & logarithmic functions",
      "Trigonometric functions",
      "Polynomial & rational functions",
      "Characteristics of functions",
    ],
    doodle: "functions",
    flagship: true,
  },
  {
    name: "Calculus & Vectors",
    codes: "MCV4U",
    blurb: "Rates of change, derivatives and vectors, practised until they're second nature.",
    topics: ["Rate of change", "Derivatives & their applications", "Geometry & algebra of vectors"],
    doodle: "calculus",
  },
  {
    name: "Physics",
    codes: "SPH3U · SPH4U",
    blurb: "Turn formulas into intuition, from kinematics in grade 11 to fields in grade 12.",
    topics: ["Kinematics & forces", "Energy & momentum", "Waves, fields & electricity"],
    doodle: "physics",
  },
];

// Source: Notion Teachers Tracker subjects, tutoring pages on the current site.
export const OTHER_SUBJECTS = [
  "Functions · MCR3U",
  "Chemistry · SCH3U, SCH4U",
  "Biology · SBI3U, SBI4U",
  "Euclid contest prep",
  "IB Math",
  "SAT / ACT Math",
  "First-year university calculus",
];

// Source: content/offer.ts bullets and content/methods.ts on the current site.
export const REASONS = [
  {
    title: "1-on-1, every lesson",
    body: "One student, one tutor, one plan. Lessons are live and online, so there's no commute and no crowded classroom.",
    icon: "one",
  },
  {
    title: "Scheduling that bends",
    body: "Weekly, twice a week, or just before a big test. Lessons fit around school, sports and everything else.",
    icon: "calendar",
  },
  {
    title: "No packages, no contracts",
    body: "Pay by the hour and stop any time. You stay because it's working, not because you prepaid.",
    icon: "unlock",
  },
  {
    title: "Teaching that adapts",
    body: "Lessons are problems, not lectures. We map the mistakes your student makes and aim practice at the ones not yet cleared.",
    icon: "target",
  },
] as const;

export type Tutor = {
  id: string;
  name: string;
  role: string;
  headline: string; // short line on the name pill
  intro: string; // one-line introduction, built only from `credentials`
  photo: string | null; // null = placeholder until a real photo is supplied
  credentials: string[];
  teaches: string[];
};

// Confirmed active staff only (Notion Teachers Tracker, Nov 2026).
// Charlie's credentials: current site (Credentials.tsx, config TEACHERS).
// Noah and Kuby: résumé summaries on their Notion staff pages (received Oct 9, 2026).
// Headshots supplied by Charlie (Nov 6, 2026), cropped from one group image.
export const TUTORS: Tutor[] = [
  {
    id: "charlie",
    name: "Mr. Charlie",
    role: "Founder & lead tutor",
    headline: "Founder, 8+ years",
    intro: "Waterloo Software Engineering grad. Energetic, approachable, and still teaches every week.",
    photo: "/tutor-charlie.jpg",
    credentials: [
      "University of Waterloo, Software Engineering",
      "8+ years tutoring",
      "Energetic, approachable, and still teaches every week",
    ],
    teaches: ["Advanced Functions", "Calculus", "Functions", "Physics", "Euclid"],
  },
  {
    id: "noah",
    name: "Mr. Noah",
    role: "Tutor",
    headline: "Waterloo Engineering grad",
    intro: "Electrical Engineering with Dean's Honours, and a former Waterloo teaching assistant.",
    photo: "/tutor-noah.jpg",
    credentials: [
      "University of Waterloo, Electrical Engineering (BASc), Dean's Honours",
      "Former University of Waterloo teaching assistant",
      "2 years tutoring grade 11–12 math & science",
    ],
    teaches: ["Grade 11–12 math", "Physics"],
  },
  {
    id: "kuby",
    name: "Mr. Kuby",
    role: "Tutor",
    headline: "7+ years, senior math",
    intro: "BCIT Electrical Engineering grad. Senior math, IB Math and SAT/ACT prep.",
    photo: "/tutor-kuby.jpg",
    credentials: [
      "BCIT, Electrical Engineering (BSc)",
      "7+ years tutoring senior math",
      "Supervised Waterloo CEMC computing math camps",
    ],
    teaches: ["Calculus", "Functions", "IB Math", "SAT / ACT Math"],
  },
];
