import {app} from "@/config/firebase"

import { getFirestore, doc, setDoc } from "firebase/firestore"
import { handleError } from "../utils";

const db = getFirestore(app)

export async function createUser(user: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    clerkId: string;
  
}) {

let result:any

    try {
        result = await setDoc(doc(db, "users", user.clerkId), user,
        {
            merge: true
        })
    } catch (error) {
        console.error("Error adding document: ", error)
    }

    return result;
}


export async function getUserById(userId: string) {
    try {
        const user =  doc(db, "users", userId)
        return user
    } catch (error) {
        handleError(error)
    }
}


export async function updateUser(clerkId: string, user: any) {
    try {
        const updatedUser = await setDoc(doc(db, "users", clerkId), user, {
            merge: true
        })

        return updatedUser
    } catch (error) {
        handleError(error)
    }
}

export  function deleteUser(clerkId: string) {
    try {
        const deletedUser =  doc(db, "users", clerkId)
        return deletedUser
    } catch (error) {
        handleError(error)
    }
}