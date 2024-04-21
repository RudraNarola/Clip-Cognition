// // pages/VideoPage.tsx
// import React from 'react';

// const VideoPage: React.FC = () => {
//   const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/clipcognition.appspot.com/o/videos%2FWhat%20is%20Python_%20Why%20Python%20is%20So%20Popular_.mp4?alt=media&token=245a02b7-2d1e-4825-93f3-8110bc174457';

//   return (
//     <div className="bg-gray-900 min-h-screen flex justify-center items-center">
//       <div className="max-w-3xl w-full p-8 bg-gray-800 rounded-lg shadow-lg">
//         <video controls className="w-full rounded-lg">
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// };

// export default VideoPage;

// ---------------------------------------------------------

// pages/VideoPage.tsx
// import React from 'react';
// import Link from 'next/link';

// const VideoPage: React.FC = () => {
//   const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/clipcognition.appspot.com/o/videos%2FWhat%20is%20Python_%20Why%20Python%20is%20So%20Popular_.mp4?alt=media&token=245a02b7-2d1e-4825-93f3-8110bc174457';

//   return (
//     <div className="bg-gray-900 min-h-screen flex justify-center items-center">
//       <div className="max-w-3xl w-full p-8 bg-gray-800 rounded-lg shadow-lg">
//         <video controls className="w-full rounded-lg">
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="mt-4">
//           <Link href="/quiz"  className='inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">'>

//               Give Quiz

//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPage;




// --------------------------------------------------------------------






// pages/VideoPage.tsx
import React from "react";
import Link from "next/link";

const VideoPage: React.FC = () => {
  const videoUrl =
    "https://firebasestorage.googleapis.com/v0/b/clipcognition.appspot.com/o/videos%2FWhat%20is%20Python_%20Why%20Python%20is%20So%20Popular_.mp4?alt=media&token=245a02b7-2d1e-4825-93f3-8110bc174457";
  const videoTitle = "What is Python? Why Python is So Popular?";

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="max-w-3xl w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <video controls className="w-full rounded-lg">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2 className="mt-4 text-white text-lg">{videoTitle}</h2>
        <div className="mt-4">
          <Link
            href="/quiz"
            className='inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">'
          >
            Give Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;











