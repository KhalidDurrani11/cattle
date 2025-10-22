import React, { useState } from 'react';

interface LeaveReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
    sellerName: string;
}

const StarInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div className="flex justify-center text-4xl text-gray-500">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`transition-colors duration-200 ${(hoverRating >= star || rating >= star) ? 'text-yellow-400' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                >
                    <i className="fas fa-star"></i>
                </button>
            ))}
        </div>
    );
};


const LeaveReviewModal: React.FC<LeaveReviewModalProps> = ({ isOpen, onClose, onSubmit, sellerName }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    if (!isOpen) return null;
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a star rating.');
            return;
        }
        onSubmit(rating, comment);
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-[60] flex justify-center items-center backdrop-blur-sm p-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Leave a review for {sellerName}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fas fa-times text-xl"></i></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-center text-lg font-medium text-gray-300 mb-4">Your overall rating</label>
                        <StarInput rating={rating} setRating={setRating} />
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-lg font-medium text-gray-300 mb-2">Add a written review</label>
                        <textarea
                            id="comment"
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={`What did you like or dislike about your transaction with ${sellerName}?`}
                            className="w-full bg-gray-900 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-600"
                        ></textarea>
                    </div>
                     <div className="pt-2 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={rating === 0}>Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveReviewModal;