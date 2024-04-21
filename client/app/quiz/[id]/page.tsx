// import { QuizForm } from "@/components/quiz-form";
// import { getQuizById } from "@/lib/services/quiz.services";

// const Page = async ({ params }: { params: { id: string } }) => {
//   const quizRecord = await getQuizById(params.id);
//   console.log("quizRecord", quizRecord);

//   return <QuizForm quizRecord={quizRecord.questions} />;
// };

// export default Page;

// {
//   "questions": [
//     {
//       "question": "What is the capital of India?",
//       "options": [
//         "New Delhi",
//         "Mumbai",
//         "Chennai",
//         "Kolkata"
//       ],
//       "answer": "0",
//       "explanation": "New Delhi is the capital of India",
//       difficulty: "easy"
//       segment
//     }
//  ]

// components/QuizForm.tsx

"use client";
import QuizForm from "@/components/quiz-form";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  let quizRecord;
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    try {
      const fetchQuiz = async () => {
        const result = await fetch(`http://localhost:5000/api/${params.id}`);
        quizRecord = await result.json();
        quizRecord = JSON.parse(quizRecord);
        setQuizData(quizRecord.questions);
        // quizRecord = JSON.stringify(quizRecord);
        console.log("Fetcted quiz data: ", quizRecord.questions);
      };
      fetchQuiz();
    } catch (error) {
      console.log("Error fetching quiz data: ", error);
    }
  }, []);

  return <QuizForm quizData={quizData} />;
};

export default Page;
