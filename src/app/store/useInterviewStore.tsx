"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Question = {
  id: string;
  level: "easy" | "medium" | "hard";
  text: string;
  answer?: string;
  score?: string;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  questions: Question[];
  summary?: string;
  finalScore?: number;
  completed: boolean;
};

// State type
type State = {
  candidates: Candidate[];
  activeCandidate?: Candidate;
  setActiveCandidate: (c: Candidate) => void;
  updateCandidate: (id: string, data: Partial<Candidate>) => void;
};

export const useInterviewStore = create<State>()(
  persist(
    (set) => ({
      candidates: [],

      setActiveCandidate: (c: Candidate) =>
        set((s) => ({
          candidates: [...s.candidates, c],
          activeCandidate: c,
        })),

      updateCandidate: (id: string, data: Partial<Candidate>) =>
        set((s) => ({
          candidates: s.candidates.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),
    }),
    { name: "interview-store" }
  )
);
