import React, { useState } from 'react';
import { Cattle } from '../types';
import { MOCK_USERS } from '../constants';
import StarRating from './StarRating';
import LeaveReviewModal from './LeaveReviewModal'; // Import the new modal
import { getCattleImageUrl } from '../lib/imageUtils';

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
        // In a real app, you would send this to your backend.
        if (process.env.NODE_ENV === 'development') {
            console.log(`Review for seller ${seller?.id}: ${rating} stars, "${comment}"`);
        }
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
                <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-4xl border border-[#8B4513]/30 max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 p-4 border-b border-[#8B4513]/30 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-[#654321]">{cattle.breed}</h2>
                        <button onClick={onClose} className="text-[#8B4513] hover:text-[#A0522D] transition-all duration-300 transform hover:scale-125"><i className="fas fa-times text-xl"></i></button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <img 
                                    src={getCattleImageUrl(cattle.id, cattle.imageUrl)} 
                                    alt={`${cattle.breed} - ${cattle.location} - ${cattle.age} years old, ${cattle.weight}kg`}
                                    className="w-full h-80 object-cover object-center rounded-lg mb-4 shadow-lg"
                                    style={{ aspectRatio: '4/3' }}
                                    loading="eager"
                                    decoding="async"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        if (target.src !== cattle.imageUrl) {
                                            target.src = cattle.imageUrl;
                                        }
                                    }}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <img 
                                        src={getCattleImageUrl(cattle.id, cattle.imageUrl)} 
                                        alt={`${cattle.breed} side view`}
                                        className="w-full h-32 object-cover object-center rounded-lg filter grayscale"
                                        style={{ aspectRatio: '16/9' }}
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            if (target.src !== cattle.imageUrl) {
                                                target.src = cattle.imageUrl;
                                            }
                                        }}
                                    />
                                    <img 
                                        src={getCattleImageUrl(cattle.id, cattle.imageUrl)} 
                                        alt={`${cattle.breed} detail view`}
                                        className="w-full h-32 object-cover object-center rounded-lg filter sepia"
                                        style={{ aspectRatio: '16/9' }}
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            if (target.src !== cattle.imageUrl) {
                                                target.src = cattle.imageUrl;
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mb-6">
                                    <p className="text-3xl font-bold text-[#8B4513] mb-2">PKR {cattle.price.toLocaleString()}</p>
                                    {seller && (
                                        <div className="text-[#654321] mb-2">
                                            <i className="fas fa-user-check mr-2 rtl:mr-0 rtl:ml-2 text-[#8B4513]"></i>Seller: {' '}
                                            <button onClick={handleSellerClick} className="font-semibold text-[#8B4513] hover:text-[#A0522D] underline transition-all duration-300 transform hover:scale-105">{seller.name}</button>
                                            <div className="ml-6 rtl:ml-0 rtl:mr-6">
                                                <StarRating rating={seller.rating} ratingCount={seller.ratingCount} />
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-[#654321]"><i className="fas fa-map-marker-alt mr-2 rtl:mr-0 rtl:ml-2 text-[#8B4513]"></i>Location: <span className="font-semibold text-[#654321]">{cattle.location}</span></p>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center mb-6 bg-[#F5F5DC]/80 p-4 rounded-lg border border-[#8B4513]/30">
                                    <div><p className="text-xs text-[#8B4513]">Age</p><p className="font-semibold text-[#654321]">{cattle.age} yrs</p></div>
                                    <div><p className="text-xs text-[#8B4513]">Weight</p><p className="font-semibold text-[#654321]">{cattle.weight} kg</p></div>
                                    <div><p className="text-xs text-[#8B4513]">Gender</p><p className="font-semibold text-[#654321]">{cattle.gender}</p></div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-[#654321] mb-4"><i className="fas fa-passport mr-2 rtl:mr-0 rtl:ml-2 text-[#8B4513]"></i>Digital Health Passport</h3>
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 rtl:pr-0 rtl:pl-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#8B4513]/30 pl-4 rtl:pl-0 rtl:pr-4">
                                    {cattle.healthRecords.length > 0 ? cattle.healthRecords.map((record, index) => (
                                        <div key={index} className="bg-[#F5F5DC]/60 p-3 rounded-lg border border-[#8B4513]/20">
                                            <p className="font-semibold text-[#654321]">{record.vaccine}</p>
                                            <p className="text-sm text-[#8B4513]">Date: {record.date} | Vet: {record.vet}</p>
                                            <p className="text-sm text-[#654321] mt-1">Notes: {record.notes}</p>
                                        </div>
                                    )) : 
                                    <div className="bg-[#F5F5DC]/60 p-3 rounded-lg border border-[#8B4513]/20">
                                        <p className="text-[#8B4513] text-center">No health records available.</p>
                                    </div>
                                    }
                                </div>

                                <div className="mt-8 flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <button className="group relative w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold py-4 rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 border-2 border-[#654321]/30 active:scale-100 active:translate-y-0">
                                            <span className="relative z-10">Buy Now</span>
                                            <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                        </button>
                                        <button className="group relative w-full bg-gradient-to-r from-[#A0522D] to-[#8B4513] text-white font-bold py-4 rounded-xl hover:from-[#8B4513] hover:to-[#A0522D] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#A0522D]/70 border-2 border-[#654321]/30 active:scale-100 active:translate-y-0">
                                            <span className="relative z-10">Make an Offer</span>
                                            <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                        </button>
                                    </div>
                                    <button onClick={() => setIsReviewModalOpen(true)} className="group relative w-full bg-white border-2 border-[#8B4513] text-[#8B4513] font-bold py-4 rounded-xl hover:bg-gradient-to-r hover:from-[#8B4513] hover:to-[#A0522D] hover:text-white hover:border-[#654321] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/60 active:scale-100 active:translate-y-0">
                                        <span className="relative z-10"><i className="fas fa-star mr-2 rtl:mr-0 rtl:ml-2"></i> Leave a Review</span>
                                        <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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