import React, { useState } from "react";

interface Answer {
  title: string;
  correctAnswer: string;
  explanation: string;
  difficulty: string;
}

interface ReportCardProps {
  correctAnswers: number;
  wrongAnswers: number;
  incorrectAnswers: Answer[];
  correctOptions: Answer[];
}

const ReportCard: React.FC<ReportCardProps> = ({
  correctAnswers,
  wrongAnswers,
  incorrectAnswers,
  correctOptions,
}) => {
  const [showIncorrectAnswers, setShowIncorrectAnswers] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white">
      <h2 className="text-2xl mb-4">Report Card</h2>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Wrong Answers : {wrongAnswers}</p>

      <div className="mt-4">
        <button
          className="text-red-500 underline focus:outline-none"
          onClick={() => setShowIncorrectAnswers(!showIncorrectAnswers)}
        >
          Incorrect Answers
        </button>
        <br />
        {showIncorrectAnswers &&
          incorrectAnswers.map((answer, index) => (
            <div key={index} className="bg-orange-600 mt-4 p-3 rounded-md">
              <h3>{answer.title}</h3>
              <p>Correct Answer: {answer.correctAnswer}</p>
              <p>Explanation: {answer.explanation}</p>
              <p>Difficulty: {answer.difficulty}</p>
            </div>
          ))}

        <button
          className="text-green-500 underline focus:outline-none mt-4"
          onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
        >
          Correct Answers
        </button>

        {showCorrectAnswers &&
          correctOptions.map((answer, index) => (
            <div key={index} className="bg-lime-600 mt-4 p-3 rounded-md">
              <h3>{answer.title}</h3>
              <p>Correct Answer: {answer.correctAnswer}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReportCard;
