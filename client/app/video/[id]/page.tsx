import VideoPlayer from "@/components/VideoPlayer";
import { getVideoById } from "@/lib/services/video.services";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const videoRecord = await getVideoById(params.id);

  return (
    <>
      <VideoPlayer
        url={videoRecord.video_url}
        title={videoRecord.title}
        quizId={videoRecord.quizId}
      />
    </>
  );
};

export default Page;
