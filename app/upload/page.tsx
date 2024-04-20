"use client";
// import "./App.css";
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import UploadButton from "../../components/upload-button/UploadButton";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

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
      () => {``
        console.log("success!!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadToDatabase(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };
  return (
   
    <div className=" mt-6 bg-f5f8ff font-montserrat font-normal text-2f2d2f leading-6 flex justify-center pt-100 h-100vh py-100 container">

   

    <div className="box bg-white p-30 rounded-lg shadow-box-shadow w-full">
        <h2 className="m-4 header mb-30 text-center font-mono font-medium"> Drop files</h2>
        <div className="text-center  p-4 flex flex-col items-center">
        <DropFileInput onFileChange={(files) => onFileChange(files)} />
        </div>
       
        <br></br>
        <div className="p-7">
        <UploadButton onClick={() => handleClick()}></UploadButton>
        </div>
       
    </div>
    </div>

    // <div className="box">
    //   <h2 className="header">React drop files input</h2>
    //   <DropFileInput onFileChange={(files) => onFileChange(files)} />
    //   <br></br>
    //   <UploadButton onClick={() => handleClick()}></UploadButton>
    // </div>

    // <div className="bg-f5f8ff p-8 rounded-lg shadow-md">
    // <h2 className="mb-8 text-center">React drop files input</h2>
    // <DropFileInput onFileChange={(files) => onFileChange(files)} />
 
    // <UploadButton  onClick={() => handleClick()}></UploadButton>
    // </div>
  );
};

export default Page;
