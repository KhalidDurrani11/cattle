import React, { useState, useMemo } from 'react';
import { MOCK_USERS, MOCK_CATTLE_DATA, MOCK_REVIEWS } from '../constants';
import { Cattle, Review } from '../types';
import StarRating from './StarRating';
import CattleCard from './CattleCard';
import CattleDetailsModal from './CattleDetailsModal';
import ReviewCard from './ReviewCard';

interface SellerProfilePageProps {
    sellerId: string;
    onViewSeller: (sellerId: string) => void;
}

const RatingSummary: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    const ratingDistribution = useMemo(() => {
        const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            // FIX: The rating could be a float, causing an unsafe property access.
            // Ensure the rating is an integer and a valid key before using it.
            const rating = review.rating;
            if (Number.isInteger(rating) && rating >= 1 && rating <= 5) {
                dist[rating as keyof typeof dist]++;
            }
        });
        return dist;
    }, [reviews]);
    
    const totalReviews = reviews.length;
    if (totalReviews === 0) return null;

    return (
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Rating Distribution</h3>
            <div className="space-y-2">
                {Object.entries(ratingDistribution).reverse().map(([star, count]) => {
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return (
                        <div key={star} className="flex items-center gap-4">
                            <span className="text-sm text-gray-300 w-12">{star} star{Number(star) > 1 ? 's' : ''}</span>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const SellerProfilePage: React.FC<SellerProfilePageProps> = ({ sellerId, onViewSeller }) => {
    const [selectedCattle, setSelectedCattle] = useState<Cattle | null>(null);
    const seller = MOCK_USERS.find(u => u.id === sellerId);
    const sellerCattle = MOCK_CATTLE_DATA.filter(c => c.sellerId === sellerId);
    const sellerReviews = MOCK_REVIEWS.filter(r => r.sellerId === sellerId);

    if (!seller) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-3xl font-bold text-white">Seller not found.</h1>
            </div>
        );
    }

    return (
        <>
            <CattleDetailsModal cattle={selectedCattle} onClose={() => setSelectedCattle(null)} onViewSeller={onViewSeller} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                <section>
                    <div className="bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-700/50">
                        <h1 className="text-4xl font-bold text-white">{seller.name}</h1>
                        <p className="text-gray-400 mt-2"><i className="fas fa-map-marker-alt mr-2"></i>{seller.location}</p>
                        <div className="mt-4">
                            <StarRating rating={seller.rating} ratingCount={seller.ratingCount} />
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-8">Listings from {seller.name}</h2>
                    {sellerCattle.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {sellerCattle.map(cattle => (
                                <CattleCard key={cattle.id} cattle={cattle} onViewDetails={setSelectedCattle} onViewSeller={onViewSeller} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center bg-gray-800/30 p-12 rounded-2xl">
                            <p className="text-xl text-gray-400">{seller.name} has no active listings.</p>
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-8">Customer Reviews</h2>
                     {sellerReviews.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <RatingSummary reviews={sellerReviews} />
                            </div>
                            <div className="lg:col-span-2 space-y-6">
                                {sellerReviews.map(review => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </div>
                    ) : (
                         <div className="text-center bg-gray-800/30 p-12 rounded-2xl">
                            <p className="text-xl text-gray-400">No reviews yet for {seller.name}.</p>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default SellerProfilePage;