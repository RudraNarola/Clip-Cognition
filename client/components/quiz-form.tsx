"use client";
import { auth } from "@clerk/nextjs/server";
import React, { useState } from "react";
import ReportCard from "./Reportcard";

const QuizForm = ({ quizData }: { quizData: any }) => {
  console.log("2312", quizData);
  const [showReport, setShowReport] = useState(false);

  quizData = quizData.map((quiz: any, index: number) => {
    return {
      id: index,
      title: quiz.question,
      options: quiz.options,
      correctAnswerIndex: quiz.answer,
      explaination: quiz.explanation,
      difficulty: quiz.difficulty,
    };
  });

  const [answers, setAnswers] = useState<number[]>(
    new Array(quizData.length).fill(-1)
  );

  const [scoreState, setScoreState] = useState([]);

  const handleRadioChange = (
    questionIndex: number,
    selectedOptionIndex: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOptionIndex;
    setAnswers(newAnswers);
  };

  const updateScoreOnDB = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: scoreState,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error updating score on DB: ", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const score = calculateScore();
    updateScoreOnDB();
    console.log(`Your score: ${score}/${quizData.length}`);
    setShowReport(true);
  };

  const calculateScore = (): number => {
    let score = 0;
    quizData.forEach((question, index) => {
      if (answers[index] === question.correctAnswerIndex) {
        score++;
        setScoreState((array) => [...array, 1]);
        // array = [...array, 1];
      } else {
        // array = [...array, 0];
        setScoreState((array) => [...array, 0]);
      }
    });
    console.log("first", scoreState);

    return score;
  };

  if (showReport) {
    let sum = 0;
    scoreState.forEach((element) => {
      sum += element;
    });

    let inncorrectAnswers = [];
    let correctAnswers = [];

    for (let i = 0; i < quizData.length; i++) {
      if (scoreState[i] === 0) {
        console.log(i, quizData[i]);
        inncorrectAnswers.push({
          title: quizData[i].title,
          correctAnswer: quizData[i].options[quizData[i].correctAnswerIndex],
          explanation: quizData[i].explaination,
          difficulty: quizData[i].difficulty,
        });
      } else {
        correctAnswers.push({
          title: quizData[i].title,
          correctAnswer: quizData[i].options[quizData[i].correctAnswerIndex],
        });
      }
    }

    console.log("incooree", inncorrectAnswers);

    return (
      <ReportCard
        correctAnswers={sum}
        wrongAnswers={scoreState.length - sum}
        incorrectAnswers={inncorrectAnswers}
        correctOptions={correctAnswers}
      />
    );
  }

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
