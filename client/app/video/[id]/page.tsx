import VideoPlayer from "@/components/VideoPlayer";
// import { getVideoById } from "@/lib/services/video.services";
import { getVideoById } from "@/lib/firebase/video.services";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const videoRecord: any = await getVideoById(params.id);

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
