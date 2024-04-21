"use client";
import React, { useState } from "react";

const QuizForm = ({ quizData }: { quizData: any }) => {
  console.log("2312", quizData);

  quizData = quizData.map((quiz: any, index: number) => {
    return {
      id: index,
      title: quiz.question,
      options: quiz.options,
      correctAnswerIndex: quiz.answer,
      explaination: quiz.explanation,
    };
  });

  const [answers, setAnswers] = useState<number[]>(
    new Array(quizData.length).fill(-1)
  );

  const handleRadioChange = (
    questionIndex: number,
    selectedOptionIndex: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOptionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const score = calculateScore();
    alert(`Your score: ${score}/${quizData.length}`);
  };

  const calculateScore = (): number => {
    let score = 0;
    quizData.forEach((question, index) => {
      if (answers[index] === question.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded-lg shadow-md"
    >
      {quizData.map((question, index) => (
        <div key={question.id} className="mb-4">
          <p className="font-bold">{question.title}</p>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex} className="block mt-2">
              <input
                type="radio"
                value={optionIndex}
                checked={answers[index] === optionIndex}
                onChange={() => handleRadioChange(index, optionIndex)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default QuizForm;
