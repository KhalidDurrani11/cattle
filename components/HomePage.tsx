import React, { useState } from 'react';
import { Page, Cattle } from '../types';
import CattleCard from './CattleCard';
import MarketChart from './MarketChart';
import { MOCK_CATTLE_DATA, MARKET_TRENDS_DATA } from '../constants';
import CattleDetailsModal from './CattleDetailsModal';
import { useTranslation } from '../hooks/useTranslation';
import { getHeroImageUrl } from '../lib/imageUtils';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  onViewSeller: (sellerId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, onViewSeller }) => {
  const [selectedCattle, setSelectedCattle] = useState<Cattle | null>(null);
  const { t } = useTranslation();

  return (
    <>
      <CattleDetailsModal cattle={selectedCattle} onClose={() => setSelectedCattle(null)} onViewSeller={onViewSeller} />
      <div className="space-y-24 pb-24">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105 transform"
            style={{ backgroundImage: `url('${getHeroImageUrl()}'), url('https://images.unsplash.com/photo-1570027878205-57715478c94a?q=80&w=1920&auto=format&fit=crop')` }}
            role="img"
            aria-label="Cattle marketplace hero background"
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5DC]/60 via-[#F5F5DC]/30 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 animate-fade-in-down">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto mb-8 animate-fade-in-up">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex justify-center gap-4 animate-fade-in-up">
              <button 
                onClick={() => setCurrentPage(Page.MARKETPLACE)}
                className="group relative px-10 py-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_40px_rgba(139,69,19,0.6)] border-2 border-[#654321]/30 active:scale-105 active:translate-y-0">
                <span className="relative z-10">{t('home.exploreMarketplace')}</span>
                <span className="absolute inset-0 bg-white/25 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
              <button 
                onClick={() => setCurrentPage(Page.LOGIN)}
                className="group relative px-10 py-4 bg-white/25 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/40 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-2 border-white/40 hover:border-white/70 shadow-xl hover:shadow-2xl hover:shadow-white/30 active:scale-105 active:translate-y-0">
                <span className="relative z-10">{t('home.sellCattle')}</span>
                <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            </div>
          </div>
        </section>

        {/* Featured Cattle Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#654321] mb-2">{t('home.featuredListings')}</h2>
          <p className="text-center text-[#8B4513] mb-12">{t('home.featuredSubtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_CATTLE_DATA.slice(0, 3).map((cattle, index) => (
              <div key={cattle.id} style={{ animationDelay: `${index * 150}ms` }} className="animate-fade-in-up">
                <CattleCard cattle={cattle} onViewDetails={setSelectedCattle} onViewSeller={onViewSeller}/>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#654321] mb-12">{t('home.seamlessExperience')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mb-4 border-2 border-[#8B4513]/30 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <i className="fas fa-qrcode text-4xl text-[#8B4513]"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-[#654321] mb-2">{t('home.step1Title')}</h3>
                    <p className="text-[#8B4513]">{t('home.step1Desc')}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mb-4 border-2 border-[#8B4513]/30 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <i className="fas fa-store text-4xl text-[#8B4513]"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-[#654321] mb-2">{t('home.step2Title')}</h3>
                    <p className="text-[#8B4513]">{t('home.step2Desc')}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mb-4 border-2 border-[#8B4513]/30 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <i className="fas fa-truck text-4xl text-[#8B4513]"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-[#654321] mb-2">{t('home.step3Title')}</h3>
                    <p className="text-[#8B4513]">{t('home.step3Desc')}</p>
                </div>
            </div>
        </section>

        {/* Market Trends Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#654321] mb-12">{t('home.marketInsights')}</h2>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-[#8B4513]/30">
              <MarketChart data={MARKET_TRENDS_DATA} />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

// Add keyframe animations to a style tag or index.css if possible, for now using tailwind.config.js extend for it.
// Here's an example of how you'd add it in a global stylesheet.
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out forwards;
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}
`;
document.head.appendChild(style);