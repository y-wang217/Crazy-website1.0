// Guards the public preview: run with `npm test` (node --test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { PREVIEW_STUDENT, PUBLIC_LESSON_LIMIT, SUBJECT_TABS, improvement } from "./progress-public.ts";

const STUDENT_KEYS = ["initials", "lessonsLogged", "since", "latestNote", "records"];
const RECORD_KEYS = ["subject", "title", "courseCode", "entries"];
const ENTRY_KEYS = ["date", "course", "score", "summary"];

test("each subject shows at most the public limit of lesson summaries", () => {
  for (const r of PREVIEW_STUDENT.records) {
    assert.ok(r.entries.length <= PUBLIC_LESSON_LIMIT, `${r.subject} has ${r.entries.length} entries`);
  }
});

test("no field outside the public shape ships to the browser", () => {
  assert.deepEqual(Object.keys(PREVIEW_STUDENT).sort(), [...STUDENT_KEYS].sort());
  for (const r of PREVIEW_STUDENT.records) {
    assert.deepEqual(Object.keys(r).sort(), [...RECORD_KEYS].sort());
    for (const e of r.entries) assert.deepEqual(Object.keys(e).sort(), [...ENTRY_KEYS].sort());
  }
});

test("public summaries stay short", () => {
  for (const r of PREVIEW_STUDENT.records)
    for (const e of r.entries) if (e.summary) assert.ok(e.summary.length <= 140, e.summary);
});

test("every record belongs to a known tab", () => {
  const keys = SUBJECT_TABS.map((t) => t.key);
  for (const r of PREVIEW_STUDENT.records) assert.ok(keys.includes(r.subject));
});

test("improvement is only claimed when two scores exist", () => {
  const physics = PREVIEW_STUDENT.records.find((r) => r.subject === "physics")!;
  assert.deepEqual(
    { first: improvement(physics)!.first.score, latest: improvement(physics)!.latest.score, points: improvement(physics)!.points },
    { first: 82, latest: 93, points: 11 },
  );
  const chemistry = PREVIEW_STUDENT.records.find((r) => r.subject === "chemistry")!;
  assert.equal(improvement(chemistry), null);
});
