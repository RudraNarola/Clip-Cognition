import React from "react";
import Link from "next/link";

const VideoPlayer = ({
  url,
  title,
  quizId,
}: {
  url: string;
  title: string;
  quizId: string;
}) => {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="max-w-3xl w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <video controls className="w-full rounded-lg">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2 className="mt-4 text-white text-lg">{title}</h2>
        <div className="mt-4">
          <Link
            href={`/quiz/${quizId}`}
            className='inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">'
          >
            Give Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
