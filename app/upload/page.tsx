"use client";
<<<<<<< HEAD
=======

>>>>>>> ed6c01fe289c0c2a44f862637f06ce34d984a78d
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import UploadButton from "../../components/upload-button/UploadButton";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VideoUploadForm from "@/components/form/video-upload-form";

interface DocData {
  mostRecentUploadURL: string;
  username: string;
}

const Page = () => {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (files: File[]) => {
    const currentFile = files[0];
    setFile(currentFile);
    console.log(files);
  };

  const uploadToDatabase = (url: string) => {
    let docData: DocData = {
      mostRecentUploadURL: url,
      username: "Lightning Thunder",
    };
    const userRef = doc(db, "users", docData.username);
    setDoc(userRef, docData, { merge: true })
      .then(() => {
        console.log("successfully updated DB");
      })
      .catch((error) => {
        console.log("errrror");
      });
  };

  const handleClick = () => {
    if (file === null) return;

    const fileRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log("error :(");
      },
      () => {
        ``;
        console.log("success!!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadToDatabase(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };
  return (
    <div className="bg-[#121417] container flex flex-col items-center w-[80%] pt-3 text-white pb-8 mt-4 rounded-md">
      <div className="text-3xl font-bold font-custom pt-2 ">
        Make Your Own Course
      </div>
      <section className="px-8 py-4 rounded-md w-[70%]">
        <VideoUploadForm />
      </section>
    </div>
  );
};

export default Page;
