// components/ResumeUploader.tsx
"use client";

import React, { useState } from "react";
import { CloudUpload, FileText } from "lucide-react"; // Make sure lucide-react is installed

type Extracted = {
  name?: string;
  email?: string;
  phone?: string;
};

interface ResumeUploaderProps {
  onExtract: (data: Extracted) => void;
}

export default function ResumeUploader({ onExtract }: ResumeUploaderProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    try {
      const text = await file.text();

      // Simple regex heuristics for demo purposes
      const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
      const phoneMatch = text.match(/(\+?\d[\d-\s]{7,}\d)/);

      const nameMatch =
        text.match(/Name[:\s]*([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/m) ||
        text
          .split(/\r?\n/)
          .find((line) => /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)*$/.test(line));

      onExtract({
        name: nameMatch
          ? (Array.isArray(nameMatch)
              ? nameMatch[1] || nameMatch[0]
              : nameMatch
            )
              .toString()
              .trim()
          : undefined,
        email: emailMatch ? emailMatch[0] : undefined,
        phone: phoneMatch ? phoneMatch[0] : undefined,
      });
    } catch (err) {
      console.error("Failed to read file:", err);
      onExtract({});
    }
  }

  return (
    <div className="p-6 bg-white/80 backdrop-blur-xl rounded-2xl border shadow-lg flex flex-col items-center text-center space-y-4 transition hover:shadow-xl">
      <CloudUpload className="w-12 h-12 text-blue-500 animate-bounce" />

      <h2 className="text-xl font-semibold text-gray-800">
        Upload Your Resume
      </h2>
      <p className="text-gray-500 text-sm">
        Supports <span className="font-medium">PDF, DOCX, TXT</span>. We’ll try
        to extract your name, email, and phone.
      </p>

      <label
        htmlFor="resume-upload"
        className="cursor-pointer mt-3 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2"
      >
        <CloudUpload className="w-5 h-5" />
        <span>Select Resume</span>
      </label>
      <input
        id="resume-upload"
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFile}
        className="hidden"
      />

      {fileName && (
        <div className="flex items-center gap-2 mt-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg shadow-sm">
          <FileText className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">{fileName}</span>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2">
        ⚠️ Demo only: uses regex heuristics. For production, use a proper resume
        parser.
      </p>
    </div>
  );
}
