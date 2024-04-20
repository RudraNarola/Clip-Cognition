import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const HomePage = () => {
  return (
    <>
      <section className="container mt-6 text-white font-custom">
        <div className=" w-full h-[40%] rounded-sm px-10 py-4 flex flex-col">
          <h1 className="mx-auto text-6xl font-bold text-center mt-6">
            Welcome To Clip Cognition{" "}
          </h1>
          <p className="text-center mt-6">
            Explore, Learn, and Quiz Your Way Through Video Knowledge!
          </p>
        </div>
        <div className="w-full flex justify-center mt-4 mx-auto">
          <Button variant={"primary"}>
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
      <section>{/* recommendedCourses.map() */}</section>
    </>
  );
};
5;

export default HomePage;

{
  /* <VideoPlayer name="Control Flow in Python - If Elif Else Statements.mp4"/> */
}
