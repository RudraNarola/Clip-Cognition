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
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

interface DocData {
  mostRecentUploadURL: string;
  username: string;
}

const VideoUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const sendUrl = async (url: string, title: string, description: string) => {
    try {
      const response = await fetch("http://localhost:5000/getTranscript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          url: url,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Failed to send URL to server", error);
    }
  };

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
        setError(true);
        console.log("Error updating DB", error);
      });
    setIsPending(false);
  };

  const handleUpload = (values: z.infer<typeof VideoValidation>) => {
    setIsPending((prev) => true);

    if (file === null) return;

    const fileRef = ref(storage, `${values.title}`);
    // Check if file with same name already exists in storage
    // if (fileRef) {
    //   form.formState.errors.title.message =
    //     "File name already exists. Please rename the file and try again.";
    // }

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let temp = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(temp);
        setProgress(temp);
      },
      (error) => {
        setError(true);
        console.log("error uploading file", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        sendUrl(downloadURL, values.title, values.description);

        uploadToDatabase(downloadURL);
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

  if (error) {
    return (
      <div className="text-2xl text-white flex flex-col justify-center items-center py-32 w-full text-center font-custom">
        <h1 className="text-4xl mb-4 font-bold">
          Error <span className="text-red-500">Uploading Video</span>
        </h1>
        <h3>Please try again later.</h3>
        <Link href="/" className="w-full">
          <Button variant="primary" className="mt-6 w-[20%] ">
            Go Home
          </Button>
        </Link>
      </div>
    );
  }

  if (progress === 100) {
    return (
      <>
        <div className="text-2xl text-white flex flex-col justify-center items-center py-32 w-full text-center font-custom">
          <h1 className="text-4xl mb-4 font-bold">
            Video Uploaded <span className="text-green-500">Successfully</span>
          </h1>
          <h3>
            Generation of Quiz will depend upon the length of video. Thank You
            for your patience.
          </h3>
          <Link href="/" className="w-full">
            <Button variant="primary" className="mt-6 w-[20%] ">
              Go Home
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col  gap-6"
        onSubmit={form.handleSubmit(handleUpload)}
      >
        <FormField
          disabled={isPending}
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
                  className="account-form_input no-focus font-custom"
                  {...field}
                  placeholder="Enter title of video"
                />
              </FormControl>
              <FormMessage />
              {/* {form.formState.errors.title?.message} */}
              {/* </FormMessage> */}
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
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
                  className="account-form_input no-focus font-custom"
                  {...field}
                  placeholder="Enter description of video"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center flex flex-col items-center">
          <DropFileInput
            onFileChange={(files) => onFileChange(files)}
            isPending={isPending}
          />
        </div>

        <Button type="submit" disabled={isPending || !file}>
          {isPending ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              <p>Uploading </p>
              <p className="bold ml-1">{progress.toFixed(1)}</p>
            </>
          ) : (
            "Upload Video"
          )}
          {/* Upload Video{" "} */}
          {/* {file && progress !== 0 ? `${progress.toFixed(1)} %` : null} */}
        </Button>
      </form>
    </Form>
  );
};

export default VideoUploadForm;
