"use client"; // Keep this at the top for client-side features like framer-motion

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react"; // Explicitly import React if using older TS configurations, good practice

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <motion.h1
        className="text-5xl font-extrabold text-gray-900 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        AI Interview Assistant
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Choose your role to get started
      </motion.p>

      <div className="flex flex-col sm:flex-row gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg px-10 py-6 text-center cursor-pointer transition"
        >
          <Link
            href="/interviewee"
            className="text-lg font-semibold text-blue-700 hover:text-blue-900 transition"
          >
            Interviewee (Chat)
          </Link>
          <p className="mt-2 text-gray-500">Practice your interviews with AI</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg px-10 py-6 text-center cursor-pointer transition"
        >
          <Link
            href="/interviewer"
            className="text-lg font-semibold text-green-700 hover:text-green-900 transition"
          >
            Interviewer (Dashboard)
          </Link>
          <p className="mt-2 text-gray-500">
            Manage candidates and review AI-assisted results
          </p>
        </motion.div>
      </div>
    </div>
  );
}
