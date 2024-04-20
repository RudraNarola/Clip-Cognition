// components/VideoCard.tsx

import { Play } from 'lucide-react';
import React from 'react';
import { FaPlayCircle} from 'react-icons/fa';

interface VideoCardProps {
  title: string;
  rating: number;
  previewImage: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, rating, previewImage }) => {
  // Function to render star icons based on rating
 const renderStars = (rating:number) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`h-4 w-4 ${
          i <= rating ? 'text-yellow-500' : 'text-gray-300'
        }`}
        fill={i <= rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15.232l3.536 2.949-1.35-5.619 4.363-3.586-5.786-.492L12 2l-2.764 5.484-5.785.492 4.363 3.586-1.35 5.619L12 15.232z"
        />
      </svg>
    );
  }
  return stars;
};

  return (
   
    <div className="bg-neutral-600 rounded-lg shadow-md overflow-hidden relative group">
    <img src={previewImage} alt={title} className="w-full h-40 object-cover" />
    {/* <Play /> */}
    <FaPlayCircle className="text-black text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    <div className="p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="flex items-center mt-2">{renderStars(rating)}</div>
    </div>
  </div>
  );
};

export default VideoCard;
