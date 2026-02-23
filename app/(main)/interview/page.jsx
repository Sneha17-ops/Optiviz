"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: "O(log n)",
  },
  {
    question: "Which HTTP method is used to update data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    answer: "PUT",
  },
  {
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    answer: "useEffect",
  },
  {
    question: "What does REST stand for?",
    options: [
      "Remote Execution Standard Transfer",
      "Representational State Transfer",
      "Random Secure Transmission",
      "React Server Template",
    ],
    answer: "Representational State Transfer",
  },
  {
    question: "Which database is relational?",
    options: ["MongoDB", "MySQL", "Redis", "Firebase"],
    answer: "MySQL",
  },
  {
    question: "Which keyword is used in Java to inherit a class?",
    options: ["this", "super", "extends", "implements"],
    answer: "extends",
  },
  {
    question: "What is JWT mainly used for?",
    options: ["Styling", "Authentication", "Database Storage", "Routing"],
    answer: "Authentication",
  },
  {
    question: "Which is a NoSQL database?",
    options: ["PostgreSQL", "Oracle", "MongoDB", "MariaDB"],
    answer: "MongoDB",
  },
  {
    question: "Which lifecycle phase does useEffect mimic?",
    options: [
      "componentDidMount",
      "render",
      "constructor",
      "useState",
    ],
    answer: "componentDidMount",
  },
  {
    question: "Which port does Spring Boot run on by default?",
    options: ["3000", "8080", "5000", "4200"],
    answer: "8080",
  },
];

export default function MockInterview() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);

    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
      }
    }, 700);
  };

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-black via-zinc-900 to-black text-white">

      {!started && (
        <div className="text-center space-y-6 max-w-xl">
          <h1 className="text-5xl font-bold">Mock Interview</h1>
          <p className="text-gray-400">
            Test your knowledge with industry-level technical questions.
          </p>
          <Button size="lg" onClick={() => setStarted(true)}>
            Start Quiz
          </Button>
        </div>
      )}

      {started && !finished && (
        <div className="w-full max-w-2xl space-y-8">

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-800 transition-all">

            <h2 className="text-2xl font-semibold mb-6">
              {questions[current].question}
            </h2>

            <div className="space-y-4">
              {questions[current].options.map((option, index) => {
                const isCorrect = option === questions[current].answer;
                const isSelected = option === selected;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full py-3 px-4 rounded-xl border transition-all duration-300
                      ${
                        isSelected
                          ? isCorrect
                            ? "bg-green-600 border-green-600"
                            : "bg-red-600 border-red-600"
                          : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                      }
                    `}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Question {current + 1} of {questions.length}
            </p>
          </div>
        </div>
      )}

      {finished && (
        <div className="text-center space-y-6 max-w-xl">
          <h1 className="text-4xl font-bold">🎉 Quiz Completed!</h1>
          <p className="text-2xl">
            Your Score: <span className="text-blue-400">{score}</span> /{" "}
            {questions.length}
          </p>

          <Button
            size="lg"
            onClick={() => {
              setStarted(false);
              setFinished(false);
              setCurrent(0);
              setScore(0);
            }}
          >
            Restart Quiz
          </Button>
        </div>
      )}
    </div>
  );
}