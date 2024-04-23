import {app} from "@/config/firebase"

import { getFirestore, doc, setDoc } from "firebase/firestore"
import { handleError } from "../utils";

const db = getFirestore(app)


export const getRecommendedVideos = async () => {
  try {
    const result = doc(db, "clipcognition")
    return result;
   
  } catch (error) {
    console.error("Error adding document: ", error)
  }
};
