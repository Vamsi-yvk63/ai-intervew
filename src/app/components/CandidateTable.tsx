// components/CandidateTable.tsx
"use client";
import React, { useState } from "react";
import { useInterviewStore, Candidate } from "../store/useInterviewStore";

export default function CandidateTable() {
  const candidates = useInterviewStore((s) => s.candidates);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Candidate | null>(null);

  const shown = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Candidates</h2>

      {/* Search */}
      <input
        className="w-full mb-4 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="🔍 Search by name or email"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Score</th>
              <th className="text-left p-3">Completed</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className="cursor-pointer hover:bg-blue-50 transition"
              >
                <td className="p-3 font-medium text-gray-800">{c.name}</td>
                <td className="p-3 text-gray-600">{c.email}</td>
                <td className="p-3 font-semibold">
                  {c.finalScore ?? <span className="text-gray-400">-</span>}
                </td>
                <td className="p-3">
                  {c.completed ? (
                    <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                      ✅ Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-sm rounded bg-red-100 text-red-600">
                      ❌ No
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Candidate Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelected(null)}
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-2">
              Candidate: {selected.name}
            </h3>
            <p className="text-gray-600">
              <strong>Email:</strong> {selected.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {selected.phone}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Summary:</strong> {selected.summary || "Not available"}
            </p>

            <h4 className="mt-4 font-semibold text-gray-800">Questions</h4>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              {selected.questions.map((q) => (
                <li key={q.id} className="text-gray-700">
                  <span className="font-medium capitalize">{q.level}</span> —{" "}
                  {q.text}
                  <div className="text-sm text-gray-600">
                    <em>Answer:</em> {q.answer || "Not answered"}
                  </div>
                  <div className="text-sm text-gray-600">
                    <em>Score:</em> {q.score ?? "-"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
