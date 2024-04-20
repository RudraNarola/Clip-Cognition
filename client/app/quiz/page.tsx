import React from "react";
import Quize from "@/components/quiz";
const page = () => {
  return (
    <form action="report">
      <div className="w-[40rem] justify-center mx-auto mt-10">
        {/* error is bcz of indexing  */}
        <Quize />
        <Quize />
        <Quize />
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

export default page;
