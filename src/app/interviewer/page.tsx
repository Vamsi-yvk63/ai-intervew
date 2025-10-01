// app/interviewer/page.tsx
"use client";

import CandidateTable from "../components/CandidateTable";
import { Users } from "lucide-react";

export default function InterviewerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              Interviewer Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Review candidate performance, progress, and interview results.
            </p>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-black rounded-lg shadow-md hover:bg-blue-700 transition">
            + New Interview
          </button>
        </header>

        {/* Candidate Table Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-100">
          <CandidateTable />
        </div>
      </div>
    </div>
  );
}
