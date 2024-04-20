import VideoPlayer from "@/components/video-player";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-5">
      <h1 className="text-4xl font-bold text-gray-800 text-center shadow-2xl p-5 font-serif rounded-lg">
        Welcome to the Home Page!
      </h1>
      <VideoPlayer name="Control Flow in Python - If Elif Else Statements.mp4"/>

      {/* <video controls>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/clipcognition.appspot.com/o/Control%20Flow%20in%20Python%20-%20If%20Elif%20Else%20Statements.mp4?alt=media&token=03ebadc2-e398-4f93-b303-3e1f118c195e"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> */}
    </div>
  );
};

export default HomePage;
