import { Question } from "../store/useInterviewStore";

const levelMeta = {
  easy: { maxScore: 5, color: "text-green-600", badge: "🟢 Easy" },
  medium: { maxScore: 10, color: "text-yellow-600", badge: "🟡 Medium" },
  hard: { maxScore: 15, color: "text-red-600", badge: "🔴 Hard" },
};

export function generateQuestions(): Question[] {
  return [
    { id: "q1", level: "easy", text: "What is React?" },
    { id: "q2", level: "easy", text: "Explain Virtual DOM briefly." },
    {
      id: "q3",
      level: "medium",
      text: "How does Node.js handle asynchronous operations?",
    },
    {
      id: "q4",
      level: "medium",
      text: "Explain middleware in Express and an example use-case.",
    },
    {
      id: "q5",
      level: "hard",
      text: "How would you optimize React rendering for a large list?",
    },
    {
      id: "q6",
      level: "hard",
      text: "Design a scalable Node.js API for a high-traffic endpoint.",
    },
  ];
}

export function scoreAnswer(
  answer: string | undefined,
  level: "easy" | "medium" | "hard"
): number {
  if (!answer || answer.trim().length === 0) return 0;
  const len = answer.trim().length;
  const max = levelMeta[level].maxScore;
  return Math.min(Math.floor(len / 10), max);
}

export function summarizeCandidate(
  name: string,
  questions: Question[],
  finalScore: number
) {
  const strengths = questions
    .filter((q) => Number(q.score) >= 5)
    .map((q) => q.text)
    .slice(0, 3);

  return {
    title: `${name}'s Interview Summary`,
    description: `${name} answered ${questions.length} questions with a final score of ${finalScore}.`,
    strengths: strengths.length > 0 ? strengths : ["N/A"],
    badgeColor:
      finalScore > 20
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700",
  };
}
