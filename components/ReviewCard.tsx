import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-[#8B4513]/30 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-[#654321]">{review.reviewerName}</h4>
                    <p className="text-xs text-[#8B4513]">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-[#654321] mt-4 text-sm">{review.comment}</p>
        </div>
    );
};

export default ReviewCard;