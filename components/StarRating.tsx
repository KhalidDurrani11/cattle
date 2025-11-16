import React from 'react';

interface StarRatingProps {
  rating: number;
  ratingCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, ratingCount }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fas fa-star text-[#acc8d7]"></i>)}
        {halfStar && <i className="fas fa-star-half-alt text-[#acc8d7]"></i>}
        {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="far fa-star text-[#acc8d7]"></i>)}
      </div>
      {ratingCount !== undefined && <span className="text-[#8eb1c2] text-sm ml-1">({ratingCount})</span>}
    </div>
  );
};

export default StarRating;