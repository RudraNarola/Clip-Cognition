import Video from "../models/video.model";
import { connectToDB } from "../mongoose";

export const getVideoById = async (id: string) => {
  try {
    await connectToDB();
    let result = await Video.findById(id);
    result = JSON.parse(JSON.stringify(result));
    console.log("video", result);
    return result;

    console.log("deafa", result);
  } catch (error) {
    console.error(error);
  }
};
