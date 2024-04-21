import Video from "../models/video.model";
import { connectToDB } from "../mongoose";

export const getRecommendedVideos = async () => {
  try {
    connectToDB();

    const result = await Video.find().sort({ uploadDate: -1 }).limit(10);

    return result;
  } catch (error) {}
};
