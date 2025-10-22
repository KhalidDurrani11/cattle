import React, { useState } from 'react';
import { Cattle } from '../types';
import { MOCK_USERS } from '../constants';
import StarRating from './StarRating';
import LeaveReviewModal from './LeaveReviewModal'; // Import the new modal

interface CattleDetailsModalProps {
    cattle: Cattle | null;
    onClose: () => void;
    onViewSeller: (sellerId: string) => void;
}

const CattleDetailsModal: React.FC<CattleDetailsModalProps> = ({ cattle, onClose, onViewSeller }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    
    if (!cattle) return null;

    const seller = MOCK_USERS.find(u => u.id === cattle.sellerId);

    const handleSellerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose(); // Close this modal before navigating
        onViewSeller(cattle.sellerId);
    }
    
    const handleReviewSubmit = (rating: number, comment: string) => {
        console.log(`Review for seller ${seller?.id}: ${rating} stars, "${comment}"`);
        // In a real app, you would send this to your backend.
        setIsReviewModalOpen(false);
        alert('Thank you for your review!');
    };

    return (
        <>
            {seller && <LeaveReviewModal 
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}
                sellerName={seller.name}
            />}
            <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center backdrop-blur-sm p-4">
                <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-700 max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-gray-800/80 backdrop-blur-sm z-10 p-4 border-b border-gray-700 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">{cattle.breed}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fas fa-times text-xl"></i></button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <img src={cattle.imageUrl} alt={cattle.breed} className="w-full h-80 object-cover rounded-lg mb-4 shadow-lg"/>
                                <div className="grid grid-cols-2 gap-4">
                                    <img src={cattle.imageUrl.replace('seed/', 'seed/sub1')} alt="sub" className="w-full h-32 object-cover rounded-lg"/>
                                    <img src={cattle.imageUrl.replace('seed/', 'seed/sub2')} alt="sub" className="w-full h-32 object-cover rounded-lg"/>
                                </div>
                            </div>
                            <div>
                                <div className="mb-6">
                                    <p className="text-3xl font-bold text-teal-400 mb-2">PKR {cattle.price.toLocaleString()}</p>
                                    {seller && (
                                        <div className="text-gray-300 mb-2">
                                            <i className="fas fa-user-check mr-2 text-gray-500"></i>Seller: {' '}
                                            <button onClick={handleSellerClick} className="font-semibold text-white hover:text-teal-400 underline transition-colors">{seller.name}</button>
                                            <div className="ml-6">
                                                <StarRating rating={seller.rating} ratingCount={seller.ratingCount} />
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-gray-300"><i className="fas fa-map-marker-alt mr-2 text-gray-500"></i>Location: <span className="font-semibold text-white">{cattle.location}</span></p>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center mb-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                    <div><p className="text-xs text-gray-400">Age</p><p className="font-semibold text-white">{cattle.age} yrs</p></div>
                                    <div><p className="text-xs text-gray-400">Weight</p><p className="font-semibold text-white">{cattle.weight} kg</p></div>
                                    <div><p className="text-xs text-gray-400">Gender</p><p className="font-semibold text-white">{cattle.gender}</p></div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-4"><i className="fas fa-passport mr-2 text-teal-400"></i>Digital Health Passport</h3>
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 border-l-2 border-teal-500/20 pl-4">
                                    {cattle.healthRecords.length > 0 ? cattle.healthRecords.map((record, index) => (
                                        <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                                            <p className="font-semibold text-white">{record.vaccine}</p>
                                            <p className="text-sm text-gray-400">Date: {record.date} | Vet: {record.vet}</p>
                                            <p className="text-sm text-gray-300 mt-1">Notes: {record.notes}</p>
                                        </div>
                                    )) : 
                                    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                                        <p className="text-gray-400 text-center">No health records available.</p>
                                    </div>
                                    }
                                </div>

                                <div className="mt-8 flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <button className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-500 transition-colors">Buy Now</button>
                                        <button className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-colors">Make an Offer</button>
                                    </div>
                                    <button onClick={() => setIsReviewModalOpen(true)} className="w-full bg-transparent border border-teal-500 text-teal-400 font-bold py-3 rounded-lg hover:bg-teal-500/10 transition-colors">
                                        <i className="fas fa-star mr-2"></i> Leave a Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CattleDetailsModal;