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
        <div className="flex justify-center text-4xl text-[#8B4513]/30">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`transition-all duration-300 transform hover:scale-125 ${(hoverRating >= star || rating >= star) ? 'text-[#8B4513] scale-110' : ''}`}
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
            <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-lg border border-[#8B4513]/30">
                <div className="p-6 border-b border-[#8B4513]/30 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#654321]">Leave a review for {sellerName}</h2>
                    <button onClick={onClose} className="text-[#8B4513] hover:text-[#A0522D] transition-all duration-300 transform hover:scale-125"><i className="fas fa-times text-xl"></i></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-center text-lg font-medium text-[#654321] mb-4">Your overall rating</label>
                        <StarInput rating={rating} setRating={setRating} />
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-lg font-medium text-[#654321] mb-2">Add a written review</label>
                        <textarea
                            id="comment"
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={`What did you like or dislike about your transaction with ${sellerName}?`}
                            className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30"
                        ></textarea>
                    </div>
                     <div className="pt-2 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="group relative px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-500/60 border-2 border-gray-400/30 active:scale-105 active:translate-y-0">
                            <span className="relative z-10">Cancel</span>
                            <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </button>
                        <button type="submit" className="group relative px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 border-2 border-[#654321]/30 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:border-gray-400 disabled:shadow-none active:scale-105 active:translate-y-0" disabled={rating === 0}>
                            <span className="relative z-10">Submit Review</span>
                            <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left disabled:hidden"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveReviewModal;