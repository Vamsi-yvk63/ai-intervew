// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>AI Interview Assistant (Demo)</h1>
      <p>Choose your role:</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/interviewee">
          <button>Interviewee (Chat)</button>
        </Link>
        <Link href="/interviewer">
          <button>Interviewer (Dashboard)</button>
        </Link>
      </div>
    </div>
  );
}
