// components/QuizComponent.tsx
"use client";
import React from "react";
import { useIsClient } from "usehooks-ts";

const QuizComponent: React.FC = () => {
  // Sample quiz data
  const isclient = useIsClient();
  if (!isclient) {
    return <div>Loading...</div>;
  }
  const quizData = {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
  };

  return (
    <div className="bg-gray-700 hover:bg-sky-700 p-4 rounded-lg shadow-md mt-2 ">
      <h2 className="text-white text-lg mb-4">{quizData.question}</h2>
      <form>
        {quizData.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              id={`option-${index}`}
              name="quiz-option"
              value={option}
              className="mr-2"
            />
            <label htmlFor={`option-${index}`} className="text-white">
              {option}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default QuizComponent;
