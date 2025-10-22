import React, { useState } from 'react';
import { Page, Cattle } from '../types';
import CattleCard from './CattleCard';
import MarketChart from './MarketChart';
// FIX: Import MARKET_TRENDS_DATA to fix 'Cannot find name' error.
import { MOCK_CATTLE_DATA, MARKET_TRENDS_DATA } from '../constants';
import CattleDetailsModal from './CattleDetailsModal';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  onViewSeller: (sellerId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, onViewSeller }) => {
  const [selectedCattle, setSelectedCattle] = useState<Cattle | null>(null);

  return (
    <>
      <CattleDetailsModal cattle={selectedCattle} onClose={() => setSelectedCattle(null)} onViewSeller={onViewSeller} />
      <div className="space-y-24 pb-24">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-[url('https://picsum.photos/seed/farmland/1920/1080')]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">
              Buy & Sell Verified Cattle Online
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up">
              The future of livestock trading is here. A secure, transparent, and efficient marketplace for the modern farmer.
            </p>
            <div className="flex justify-center gap-4 animate-fade-in-up">
              <button 
                onClick={() => setCurrentPage(Page.MARKETPLACE)}
                className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Explore Marketplace
              </button>
              <button 
                onClick={() => setCurrentPage(Page.LOGIN)}
                className="px-8 py-3 bg-gray-700/50 text-white font-semibold rounded-lg hover:bg-gray-600/50 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                Sell Cattle
              </button>
            </div>
          </div>
        </section>

        {/* Featured Cattle Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-2">Featured Listings</h2>
          <p className="text-center text-gray-400 mb-12">Handpicked, high-quality cattle from trusted sellers across the nation.</p>
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
            <h2 className="text-3xl font-bold text-center text-white mb-12">A Seamless Trading Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="bg-gray-800/50 rounded-full w-24 h-24 flex items-center justify-center mb-4 border-2 border-teal-500/30">
                        <i className="fas fa-qrcode text-4xl text-teal-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">1. Register & Verify</h3>
                    <p className="text-gray-400">Create your account and get verified. Farmers can list cattle with a unique QR tag for full traceability.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-gray-800/50 rounded-full w-24 h-24 flex items-center justify-center mb-4 border-2 border-teal-500/30">
                        <i className="fas fa-store text-4xl text-teal-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">2. Browse & Bid</h3>
                    <p className="text-gray-400">Explore thousands of listings with detailed profiles. Place bids in real-time auctions or buy instantly.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-gray-800/50 rounded-full w-24 h-24 flex items-center justify-center mb-4 border-2 border-teal-500/30">
                        <i className="fas fa-truck text-4xl text-teal-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">3. Secure Payment & Delivery</h3>
                    <p className="text-gray-400">Pay securely through our escrow system. We handle logistics, ensuring safe and timely delivery to your location.</p>
                </div>
            </div>
        </section>

        {/* Market Trends Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Market Insights</h2>
          <div className="bg-gray-800/50 p-8 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
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