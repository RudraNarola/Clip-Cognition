import Quize from "@/components/quiz";
import { getQuizById } from "@/lib/services/quiz.services";

const Page = async ({ params }: { params: { id: string } }) => {
  const quizRecord = await getQuizById(params.id);
  console.log(quizRecord);
  return (
    <form action="report">
      <div className="w-[40rem] justify-center mx-auto mt-10">
        {quizRecord &&
          quizRecord.questions.map((quiz: any, index: number) => (
            <Quize
              key={index}
              index={index}
              question={quiz.question}
              options={quiz.options}
            />
          ))}
      </div>
      <div className="flex ms-[30rem]">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Page;
