import Quiz from "../models/quiz.model";
import { connectToDB } from "../mongoose";

export const getQuizById = async (id: string) => {
  try {
    await connectToDB();
    let result = await Quiz.findById(id);

    return result;
  } catch (error) {
    console.error(error);
  }
};
