// components/CandidateTable.tsx
"use client";

import React, { useState } from "react";
import { useInterviewStore, Candidate } from "../store/useInterviewStore";

export default function CandidateTable() {
  const candidates = useInterviewStore((s) => s.candidates);
  const [filter, setFilter] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  // Filter candidates based on name or email
  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        Candidate Dashboard
      </h2>

      {/* Search Input */}
      <div className="flex items-center gap-2 mb-6">
        <input
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
          placeholder="🔍 Search by name or email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Candidate Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead className="bg-gray-100/70 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Score</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((c, idx) => (
              <tr
                key={c.id}
                onClick={() => setSelectedCandidate(c)}
                className={`cursor-pointer transition-all ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50/80`}
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {c.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{c.email}</td>
                <td className="px-4 py-3 font-semibold text-blue-600">
                  {c.finalScore ?? <span className="text-gray-400">-</span>}
                </td>
                <td className="px-4 py-3">
                  {c.completed ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      ✅ Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                      ⏳ Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-slideUp">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setSelectedCandidate(null)}
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedCandidate.name}
            </h3>

            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> {selectedCandidate.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedCandidate.phone}
              </p>
              <p>
                <strong>Summary:</strong>{" "}
                {selectedCandidate.summary || "Not available"}
              </p>
            </div>

            <h4 className="mt-6 text-lg font-semibold text-gray-800">
              Questions
            </h4>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700">
              {selectedCandidate.questions?.map((q) => (
                <li
                  key={q.id}
                  className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="font-medium capitalize text-blue-700">
                    {q.level} — {q.text}
                  </div>
                  <div className="text-sm text-gray-600">
                    <em>Answer:</em> {q.answer || "Not answered"}
                  </div>
                  <div className="text-sm text-gray-600">
                    <em>Score:</em>{" "}
                    <span className="font-semibold text-blue-600">
                      {q.score ?? "-"}
                    </span>
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
