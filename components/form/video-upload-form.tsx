"use client";

import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { VideoValidation } from "@/lib/validations/video";
import DropFileInput from "../drop-file-input/DropFileInput";

interface DocData {
  mostRecentUploadURL: string;
  username: string;
}

const VideoUploadForm = () => {
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
        console.log("Error occurred while uploading video: ", error);
      },
      () => {
        console.log("Video uploaded successfully!!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadToDatabase(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  const form = useForm<z.infer<typeof VideoValidation>>({
    resolver: zodResolver(VideoValidation),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-6"
        onSubmit={form.handleSubmit(() => handleClick())}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-base-semibold text-light-2">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus text-black"
                  {...field}
                  placeholder="Enter title of video"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-base-semibold text-light-2">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  className="account-form_input no-focus text-black"
                  {...field}
                  placeholder="Enter description of video"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full mt-3 text-black font-montserrat font-normal flex justify-center  container">
          <div className="box bg-white p-30 rounded-lg shadow-box-shadow w-full">
            <h2 className="m-4 header mb-10 text-center  font-medium text-black">
              {" "}
              Drop Video File
            </h2>
            <div className="text-center pb-10 flex flex-col items-center">
              <DropFileInput onFileChange={(files) => onFileChange(files)} />
            </div>
          </div>
        </div>
        <Button type="submit" variant={"primary"}>
          Upload Video
        </Button>
      </form>
    </Form>
  );
};

export default VideoUploadForm;
