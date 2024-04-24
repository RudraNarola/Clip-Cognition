import { app } from "@/config/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);
const videosCollection = collection(db, "videos");

export const getRecommendedVideos = async () => {
  try {
    const querySnapshot = await getDocs(videosCollection);

    const videos = [];

    querySnapshot.forEach((doc) => {
      videos.push({ id: doc.id, ...doc.data() });
    });

    return videos;
  } catch (error) {
    console.error("Error getting recommended videos", error);

    return [];
  }
};
