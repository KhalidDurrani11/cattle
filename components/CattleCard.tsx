import React from 'react';
import { Cattle } from '../types';
import { MOCK_USERS } from '../constants';
import StarRating from './StarRating';

interface CattleCardProps {
  cattle: Cattle;
  onViewDetails: (cattle: Cattle) => void;
  onViewSeller: (sellerId: string) => void;
}

const VerifiedIcon: React.FC = () => (
  <div className="absolute top-4 right-4 bg-green-500/20 text-green-300 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm border border-green-500/30" title="Verified Health Records">
    <i className="fas fa-check"></i>
  </div>
);

const QRIcon: React.FC = () => (
    <div className="absolute top-4 left-4 bg-gray-500/20 text-gray-300 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm border border-gray-500/30" title="Digital ID">
      <i className="fas fa-qrcode"></i>
    </div>
  );

const CattleCard: React.FC<CattleCardProps> = ({ cattle, onViewDetails, onViewSeller }) => {
  const seller = MOCK_USERS.find(u => u.id === cattle.sellerId);

  const handleSellerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewSeller(cattle.sellerId);
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 shadow-lg hover:shadow-teal-500/20 transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
      <div className="relative">
        <img src={cattle.imageUrl} alt={cattle.breed} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {cattle.isVerified && <VerifiedIcon />}
        <QRIcon />
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-xl font-bold text-white">{cattle.breed}</h3>
            <p className="text-sm text-gray-300 flex items-center gap-2"><i className="fas fa-map-marker-alt"></i> {cattle.location}</p>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        {seller && (
          <div className="mb-3">
             <button onClick={handleSellerClick} className="text-sm text-gray-400 hover:text-teal-400 transition-colors">{seller.name}</button>
             <StarRating rating={seller.rating} ratingCount={seller.ratingCount} />
          </div>
        )}
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
                <p className="text-xs text-gray-400">Age</p>
                <p className="font-semibold text-white">{cattle.age} yrs</p>
            </div>
             <div>
                <p className="text-xs text-gray-400">Weight</p>
                <p className="font-semibold text-white">{cattle.weight} kg</p>
            </div>
             <div>
                <p className="text-xs text-gray-400">Gender</p>
                <p className="font-semibold text-white">{cattle.gender}</p>
            </div>
        </div>
        <div className="text-center mb-4">
            <p className="text-2xl font-bold text-teal-400">PKR {cattle.price.toLocaleString()}</p>
        </div>
        <button 
          onClick={() => onViewDetails(cattle)}
          className="w-full mt-auto bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-500 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-teal-600/30">
            View Details
        </button>
      </div>
    </div>
  );
};

export default CattleCard;