import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-white">{review.reviewerName}</h4>
                    <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-300 mt-4 text-sm">{review.comment}</p>
        </div>
    );
};

export default ReviewCard;