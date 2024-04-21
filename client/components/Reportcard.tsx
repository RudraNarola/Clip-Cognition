import React, { useState } from "react";
import { Button } from "./ui/button";

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
    <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white font-custom pl-14">
      <h2 className="text-3xl mb-4 ">Score Card</h2>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Wrong Answers : {wrongAnswers}</p>

      <div className="mt-4">
        <Button
          className="hover:text-red text-red-500  focus:outline-none"
          onClick={() => setShowIncorrectAnswers(!showIncorrectAnswers)}
          variant="ghost"
        >
          Incorrect Answers
        </Button>
        <br />
        {showIncorrectAnswers &&
          incorrectAnswers.map((answer, index) => (
            <div key={index} className="bg-orange-600 mt-4 p-3 rounded-md">
              <h3>
                <span className="font-bold">Que. </span>
                {answer.title}
              </h3>
              <p>
                {" "}
                <span className="font-bold">Answer: </span>{" "}
                {answer.correctAnswer}
              </p>
              <span className="font-bold">Explanation:</span>{" "}
              {answer.explanation}
              <br />
              <span className="font-bold">Difficulty:</span> {answer.difficulty}
            </div>
          ))}

        <Button
          className="text-green-500  focus:outline-none mt-2"
          onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
          variant="ghost"
        >
          Correct Answers
        </Button>

        {showCorrectAnswers &&
          correctOptions.map((answer, index) => (
            <div key={index} className="bg-lime-600 mt-4 p-3 rounded-md">
              <h3>
                {" "}
                <span className="font-bold">Que. </span>
                {answer.title}
              </h3>
              <p>
                {" "}
                <span className="font-bold">Correct Answer: </span>{" "}
                {answer.correctAnswer}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReportCard;
