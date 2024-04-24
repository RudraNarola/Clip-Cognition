import { app } from "@/config/firebase";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { handleError } from "../utils";
import { error } from "console";

const db = getFirestore(app);

export const getVideoById = async (id: string) => {
  let videoRef = doc(db, "videos", id);
  let result: any;
  let answer = [];
  try {
    result = await getDoc(videoRef);
    if (result.exists()) {
      answer = { id: result.id, ...result.data() };
    } else {
      console.log("No such document!");
    }
    return answer;
  } catch (e) {
    handleError(error);
  }
};
