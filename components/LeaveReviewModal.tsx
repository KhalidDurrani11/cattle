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
        <div className="flex justify-center text-4xl text-[#365563]">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={`transition-colors duration-200 ${(hoverRating >= star || rating >= star) ? 'text-[#acc8d7]' : ''}`}
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
            <div className="bg-[#253f4b] rounded-2xl shadow-2xl w-full max-w-lg border border-[#365563]">
                <div className="p-6 border-b border-[#365563] flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Leave a review for {sellerName}</h2>
                    <button onClick={onClose} className="text-[#8eb1c2] hover:text-white"><i className="fas fa-times text-xl"></i></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-center text-lg font-medium text-stone-300 mb-4">Your overall rating</label>
                        <StarInput rating={rating} setRating={setRating} />
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-lg font-medium text-stone-300 mb-2">Add a written review</label>
                        <textarea
                            id="comment"
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={`What did you like or dislike about your transaction with ${sellerName}?`}
                            className="w-full bg-[#1a2b34] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#537d90] border border-[#365563]"
                        ></textarea>
                    </div>
                     <div className="pt-2 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-[#365563] text-white rounded-lg hover:bg-[#446879] transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-[#446879] text-white rounded-lg hover:bg-[#537d90] transition-colors disabled:bg-stone-500 disabled:cursor-not-allowed" disabled={rating === 0}>Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveReviewModal;