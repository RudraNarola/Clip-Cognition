import VideoUploadForm from "@/components/form/video-upload-form";

const Page = () => {
  return (
    <div className="bg-[#121417] container flex flex-col items-center w-[70%] pt-3 text-white pb-8 mt-4 rounded-md">
      <div className="text-3xl font-bold font-custom pt-2 ">
        Make Your Own Quiz
      </div>
      <section className="px-8 py-4 rounded-md w-[90%]">
        <VideoUploadForm />
      </section>
    </div>
  );
};

export default Page;
