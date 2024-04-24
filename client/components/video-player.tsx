"use client";
import { useEffect, useState } from "react";
import { storage } from "@/config/firebase";

const VideoPlayer = ({name}:{
  name: string
}) => {
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const getVideoUrl = async () => {
      try {
        const videoRef = storage
          .ref(name);
        const url = await videoRef.getDownloadURL();
        setVideoUrl(url);
      } catch (error) {
        console.error("Error retrieving video:", error);
      }
    };

    getVideoUrl();
  }, []);

  return (
    <div>
      {/* {videoUrl && <video src={videoUrl} controls />} */}
      {videoUrl && (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
