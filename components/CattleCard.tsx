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
    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-[#365563]/20 text-stone-300 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm border border-[#365563]/30" title="Digital ID">
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
    <div className="bg-[#253f4b] rounded-2xl overflow-hidden border border-[#365563]/50 shadow-lg hover:shadow-[0_0_20px_rgba(83,125,144,0.3)] transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
      <div className="relative">
        <img 
          src={getCattleImageUrl(cattle.id, cattle.imageUrl)} 
          alt={`${cattle.breed} - ${cattle.location}`}
          className="w-full h-56 object-cover object-center"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {cattle.isVerified && <VerifiedIcon />}
        <QRIcon />
        <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 p-4">
            <h3 className="text-xl font-bold text-white">{cattle.breed}</h3>
            <p className="text-sm text-stone-300 flex items-center gap-2"><i className="fas fa-map-marker-alt"></i> {cattle.location}</p>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        {seller && (
          <div className="mb-3">
             <button onClick={handleSellerClick} className="text-sm text-[#8eb1c2] hover:text-[#acc8d7] transition-colors">{seller.name}</button>
             <StarRating rating={seller.rating} ratingCount={seller.ratingCount} />
          </div>
        )}
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
                <p className="text-xs text-[#8eb1c2]">{t('cattleCard.age')}</p>
                <p className="font-semibold text-white">{cattle.age} {t('cattleCard.yrs')}</p>
            </div>
             <div>
                <p className="text-xs text-[#8eb1c2]">{t('cattleCard.weight')}</p>
                <p className="font-semibold text-white">{cattle.weight} {t('cattleCard.kg')}</p>
            </div>
             <div>
                <p className="text-xs text-[#8eb1c2]">{t('cattleCard.gender')}</p>
                <p className="font-semibold text-white">{cattle.gender}</p>
            </div>
        </div>
        <div className="text-center mb-4">
            <p className="text-2xl font-bold text-[#608da2]">{t('cattleCard.priceUnit')} {cattle.price.toLocaleString()}</p>
        </div>
        <button 
          onClick={() => onViewDetails(cattle)}
          className="w-full mt-auto bg-[#446879] text-white font-bold py-3 rounded-lg hover:bg-[#537d90] transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-[#537d90]/30">
            {t('cattleCard.viewDetails')}
        </button>
      </div>
    </div>
  );
};

export default CattleCard;