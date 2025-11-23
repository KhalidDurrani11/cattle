import React from 'react';
import { Cattle } from '../types';
import { MOCK_USERS } from '../constants';
import StarRating from './StarRating';
import { useTranslation } from '../hooks/useTranslation';
import { getCattleImageUrl } from '../lib/imageUtils';

interface CattleCardProps {
  cattle: Cattle;
  onViewDetails: (cattle: Cattle) => void;
  onViewSeller: (sellerId: string) => void;
}

const VerifiedIcon: React.FC = () => (
  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-green-500/20 text-green-300 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm border border-green-500/30" title="Verified Health Records">
    <i className="fas fa-check"></i>
  </div>
);

const QRIcon: React.FC = () => (
    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-[#8B4513]/20 text-[#654321] rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm border border-[#8B4513]/40 shadow-md" title="Digital ID">
      <i className="fas fa-qrcode"></i>
    </div>
  );

const CattleCard: React.FC<CattleCardProps> = ({ cattle, onViewDetails, onViewSeller }) => {
  const seller = MOCK_USERS.find(u => u.id === cattle.sellerId);
  const { t } = useTranslation();

  const handleSellerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewSeller(cattle.sellerId);
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#8B4513]/30 shadow-xl hover:shadow-2xl hover:shadow-[#8B4513]/40 transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] group flex flex-col">
      <div className="relative overflow-hidden">
        <img 
          src={getCattleImageUrl(cattle.id, cattle.imageUrl)} 
          alt={`${cattle.breed} - ${cattle.location}`}
          className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
          style={{ aspectRatio: '16/9' }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Fallback to original URL if local image fails to load
            const target = e.target as HTMLImageElement;
            if (target.src !== cattle.imageUrl) {
              target.src = cattle.imageUrl;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#654321]/80 via-[#654321]/40 to-transparent"></div>
        {cattle.isVerified && <VerifiedIcon />}
        <QRIcon />
        <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 p-5 w-full">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1">{cattle.breed}</h3>
            <p className="text-sm text-white/90 flex items-center gap-2 drop-shadow-md"><i className="fas fa-map-marker-alt"></i> {cattle.location}</p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-[#F5F5DC]/50">
        {seller && (
          <div className="mb-4">
             <button onClick={handleSellerClick} className="text-sm font-medium text-[#8B4513] hover:text-[#A0522D] transition-all duration-300 transform hover:scale-105">{seller.name}</button>
             <StarRating rating={seller.rating} ratingCount={seller.ratingCount} />
          </div>
        )}
        <div className="grid grid-cols-3 gap-3 text-center mb-5 bg-[#F5F5DC]/60 rounded-lg p-3 border border-[#8B4513]/20">
            <div>
                <p className="text-xs font-medium text-[#8B4513] mb-1">{t('cattleCard.age')}</p>
                <p className="font-bold text-[#654321] text-lg">{cattle.age} {t('cattleCard.yrs')}</p>
            </div>
             <div>
                <p className="text-xs font-medium text-[#8B4513] mb-1">{t('cattleCard.weight')}</p>
                <p className="font-bold text-[#654321] text-lg">{cattle.weight} {t('cattleCard.kg')}</p>
            </div>
             <div>
                <p className="text-xs font-medium text-[#8B4513] mb-1">{t('cattleCard.gender')}</p>
                <p className="font-bold text-[#654321] text-lg">{cattle.gender}</p>
            </div>
        </div>
        <div className="text-center mb-5">
            <p className="text-3xl font-extrabold text-[#8B4513] drop-shadow-sm">{t('cattleCard.priceUnit')} {cattle.price.toLocaleString()}</p>
        </div>
        <button 
          onClick={() => onViewDetails(cattle)}
          className="w-full mt-auto bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold py-4 rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#8B4513]/60 active:scale-95 border-2 border-transparent hover:border-[#654321]/30 relative overflow-hidden group">
            <span className="relative z-10">{t('cattleCard.viewDetails')}</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
      </div>
    </div>
  );
};

export default CattleCard;