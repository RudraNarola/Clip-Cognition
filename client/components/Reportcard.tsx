import React, { useState } from "react";
import { Button } from "./ui/button";

interface Answer {
  title: string;
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  segment: number;
}

interface ReportCardProps {
  correctAnswers: number;
  wrongAnswers: number;
  incorrectAnswers: Answer[];
  correctOptions: Answer[];
}

function formatTime(seconds) {
  // Calculate hours, minutes, and remaining seconds
  // let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  // Format the time components with leading zeros if needed
  // let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(remainingSeconds).padStart(2, "0");

  // Combine the formatted components into HH:MM:SS format
  // let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  let formattedTime = `${formattedMinutes}:${formattedSeconds}`;

  return formattedTime;
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
              <div>
                <span className="font-bold">Time Segment:</span>{" "}
                <span className="text-gray-600 font-semibold">
                  {formatTime(answer.segment * 30)} -{" "}
                  {formatTime((answer.segment + 1) * 30)}
                </span>
              </div>
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
