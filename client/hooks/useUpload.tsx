// "use client";
// import { db, storage } from "@/config/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { useState } from "react";
// import * as z from "zod";
// import { VideoValidation } from "@/lib/validations/video";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// export const useUpload = ({
//   file,
//   title,
//   description,
//   form,
// }: {
//   file: File | null;
//   title: string;
//   description: string;
//   form: ReturnType<typeof useForm>;
// }) => {
//   const [progress, setProgress] = useState(0);
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState(false);

//   const sendUrl = async (url: string) => {
//     try {
//       const response = await fetch("http://localhost:5000/getTranscript", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: title,
//           description: description,
//           url: url,
//         }),
//       });
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       setError(true);
//       console.log("Failed to send URL to server", error);
//     }
//   };

//   const uploadToDatabase = (url: string) => {
//     let docData = {
//       mostRecentUploadURL: url,
//       username: "Lightning Thunder",
//     };
//     const userRef = doc(db, "users", docData.username);
//     setDoc(userRef, docData, { merge: true })
//       .then(() => {
//         console.log("successfully updated DB");
//       })
//       .catch((error) => {
//         setError(true);
//         console.log("Error updating DB", error);
//       });
//   };

//   setIsPending(true);

//   const fileRef = ref(storage, `${file.name}`);
//   // Check if file with same name already exists in storage
//   if (fileRef) {
//     form.formState.errors.title.message =
//       "File name already exists. Please rename the file and try again.";
//   }

//   const uploadTask = uploadBytesResumable(fileRef, file);

//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log(temp);
//       setProgress(temp);
//     },
//     (error) => {
//       setError(true);
//       console.log("error uploading file", error);
//     },
//     async () => {
//       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//       sendUrl(downloadURL);

//       uploadToDatabase(downloadURL);
//     }
//   );
//   setIsPending(false);

//   return { progress, isPending, error };
// };
