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
      segment: quiz.segment,
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
          segment: quizData[i].segment,
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
      <div className="w-[70%] justify-center mx-auto mt-10">
        <ReportCard
          correctAnswers={sum}
          wrongAnswers={scoreState.length - sum}
          incorrectAnswers={inncorrectAnswers}
          correctOptions={correctAnswers}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 pl-16 pt-10 font-custom rounded-lg shadow-md flex flex-col container mt-4 px-4 w-[80%] mx-auto"
    >
      <div className="flex flex-col gap-4">
        {quizData.map((question, index) => (
          <div key={question.id} className="mb-5">
            <p className="font-bold text-xl">
              {" "}
              {index + 1}. {question.title}
            </p>
            <div className="flex flex-col">
              {question.options.map((option, optionIndex) => (
                <div className="flex items-center gap-2 " key={optionIndex}>
                  <input
                    type="radio"
                    value={optionIndex}
                    checked={answers[index] === optionIndex}
                    onChange={() => handleRadioChange(index, optionIndex)}
                    className="h-3 w-3  focus:ring-blue-600 rounded-full border border-none"
                  />
                  <label key={optionIndex} className="block text-lg">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-lg w-[60%] mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default QuizForm;
