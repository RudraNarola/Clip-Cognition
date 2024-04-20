"use client"
import React from 'react';
import ReportCard from '@/components/Reportcard';

const Page = () => {
  const incorrectAnswers = [
    {
      title: 'Q1',
      correctAnswer: 'A',
      explanation: 'Explanation for Q1',
      difficulty: 'Easy',
    },
    {
      title: 'Q3',
      correctAnswer: 'C',
      explanation: 'Explanation for Q3',
      difficulty: 'Medium',
    },
    {
      title: 'Q5',
      correctAnswer: 'B',
      explanation: 'Explanation for Q5',
      difficulty: 'Hard',
    },
  ];

  const correctOptions = [
    {
      title: 'Q2',
      correctAnswer: 'B',
      explanation: 'Explanation for Q2',
      difficulty: 'Easy',
    },
    {
      title: 'Q4',
      correctAnswer: 'D',
      explanation: 'Explanation for Q4',
      difficulty: 'Medium',
    },
  ];

  return (
    <div className="w-[40rem] justify-center mx-auto mt-10">
      <ReportCard
        correctAnswers={correctOptions.length}
        wrongAnswers={incorrectAnswers.length}
        incorrectAnswers={incorrectAnswers}
        correctOptions={correctOptions}
      />
    </div>
  );
};

export default Page;