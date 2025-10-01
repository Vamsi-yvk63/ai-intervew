// app/interviewee/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import ResumeUploader from "../components/ResumeUploader";
import QuestionTimer from "../components/QuestionTimer";
import { generateQuestions, scoreAnswer, summarizeCandidate } from "../lib/ai";
import { useInterviewStore } from "../store/useInterviewStore";
import { v4 as uuidv4 } from "uuid";

export default function IntervieweePage() {
  const [extracted, setExtracted] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  } | null>(null);
  const [stage, setStage] = useState<
    "upload" | "confirm" | "interview" | "done"
  >("upload");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [answerText, setAnswerText] = useState("");

  const setActiveCandidate = useInterviewStore((s) => s.setActiveCandidate);
  const updateCandidate = useInterviewStore((s) => s.updateCandidate);
  const activeCandidate = useInterviewStore((s) => s.activeCandidate);

  const [questions, setQuestions] = useState(generateQuestions());

  const durations: Record<string, number> = { easy: 20, medium: 60, hard: 120 };

  // Initialize candidate when starting interview
  useEffect(() => {
    if (stage === "interview" && !activeCandidate && extracted) {
      const id = uuidv4();
      const c = {
        id,
        name: extracted.name || "Unknown",
        email: extracted.email || "",
        phone: extracted.phone || "",
        questions,
        summary: undefined,
        finalScore: 0,
        completed: false,
      };
      setActiveCandidate(c);
    }
  }, [stage, extracted, activeCandidate, setActiveCandidate, questions]);

  useEffect(() => {
    if (activeCandidate && stage === "interview") {
      setQuestions(activeCandidate.questions);
    }
  }, [activeCandidate, stage]);

  function startInterview() {
    if (!extracted?.name || !extracted?.email) {
      alert("Please provide name and email before starting.");
      return;
    }
    const newQs = generateQuestions();
    setQuestions(newQs);
    setStage("interview");
    setCurrentQIndex(0);
    setRunning(true);
  }

  function submitAnswer() {
    const q = questions[currentQIndex];
    if (!q) return;

    const score = scoreAnswer(answerText, q.level);
    const updatedQs = questions.map((qq, idx) =>
      idx === currentQIndex
        ? { ...qq, answer: answerText, score: score.toString() }
        : qq
    );

    setQuestions(updatedQs);
    if (activeCandidate) {
      updateCandidate(activeCandidate.id, { questions: updatedQs });
    }
    setAnswerText("");

    if (currentQIndex + 1 < updatedQs.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      const finalScore = updatedQs.reduce(
        (acc, cur) => acc + Number(cur.score || 0),
        0
      );
      if (activeCandidate) {
        const summaryText = summarizeCandidate(
          activeCandidate.name,
          updatedQs,
          finalScore
        );
        updateCandidate(activeCandidate.id, {
          questions: updatedQs,
          finalScore,
          summary: JSON.stringify(summaryText),
          completed: true,
        });
      }
      setRunning(false);
      setStage("done");
    }
  }

  function handleTimeUp() {
    submitAnswer();
  }

  // --- UI Stages ---

  // 1️⃣ Upload Resume
  if (stage === "upload") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
        <div className="max-w-lg w-full bg-white/80 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Upload Resume
          </h2>
          <ResumeUploader onExtract={(d) => setExtracted(d)} />
          <button
            onClick={() => setStage("confirm")}
            disabled={!extracted}
            className="mt-6 w-full bg-blue-600 text-black px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            Continue ➝
          </button>
        </div>
      </div>
    );
  }

  // 2️⃣ Confirm Details
  if (stage === "confirm") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
        <div className="max-w-lg w-full bg-white/80 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Confirm Details
          </h2>
          <div className="space-y-4">
            <input
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Full Name"
              value={extracted?.name || ""}
              onChange={(e) =>
                setExtracted((p) => ({ ...(p || {}), name: e.target.value }))
              }
            />
            <input
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Email"
              value={extracted?.email || ""}
              onChange={(e) =>
                setExtracted((p) => ({ ...(p || {}), email: e.target.value }))
              }
            />
            <input
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Phone"
              value={extracted?.phone || ""}
              onChange={(e) =>
                setExtracted((p) => ({ ...(p || {}), phone: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStage("upload")}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={startInterview}
              className="px-6 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700"
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3️⃣ Interview Stage
  if (stage === "interview") {
    const q = questions[currentQIndex];
    if (!q) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 flex justify-center items-center">
        <div className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Question {currentQIndex + 1} / {questions.length}
          </h2>
          <p className="mb-4 text-gray-700">
            <span className="font-semibold uppercase text-blue-600">
              {q.level}
            </span>
            : {q.text}
          </p>
          <QuestionTimer
            duration={durations[q.level] || 30}
            onTimeUp={handleTimeUp}
            running={running}
          />
          <textarea
            className="w-full mt-4 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={6}
            placeholder="Type your answer here..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <button
            onClick={submitAnswer}
            className="mt-4 w-full bg-blue-600 text-black px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Submit Answer
          </button>
        </div>
      </div>
    );
  }

  // 4️⃣ Done Stage
  if (stage === "done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 text-center max-w-lg">
          <h2 className="text-2xl font-bold text-green-600">
            ✅ Interview Completed
          </h2>
          <p className="mt-4 text-gray-700">
            Thank you! Your answers were saved successfully. You can now view
            your results in the Interviewer dashboard.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
