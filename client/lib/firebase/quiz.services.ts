import { app } from "@/config/firebase";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { handleError } from "../utils";

const db = getFirestore(app);

export const getQuizById = async (id: string) => {
  let quizRef = doc(db, "quizzes", id);
  let result: any;
  let answer = [];
  try {
    result = await getDoc(quizRef);
    if (result.exists()) {
      answer = { id: result.id, ...result.data() };
    } else {
      console.log("No such document!");
    }
    return answer;
  } catch (e) {
    handleError(e);
  }
};
