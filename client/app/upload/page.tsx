"use client";
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import UploadButton from "../../components/upload-button/UploadButton";
import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import VideoUploadForm from "@/components/form/video-upload-form";
import { set } from "mongoose";

interface DocData {
  mostRecentUploadURL: string;
  username: string;
}

const Page = () => {
  return (
    <div className="bg-[#121417] container flex flex-col items-center w-[70%] pt-3 text-white pb-8 mt-4 rounded-md">
      <div className="text-3xl font-bold font-custom pt-2 ">
        Make Your Own Course
      </div>
      <section className="px-8 py-4 rounded-md w-[90%]">
        <VideoUploadForm />
      </section>
    </div>
  );
};

export default Page;
