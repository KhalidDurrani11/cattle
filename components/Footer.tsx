import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#8B4513] border-t border-[#654321]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t('header.agriTradeX')}</h3>
            <p className="text-[#F5DEB3] text-sm">{t('footer.subtitle')}</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-[#F5DEB3] hover:text-white transition-all duration-300 transform hover:scale-125"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-[#F5DEB3] hover:text-white transition-all duration-300 transform hover:scale-125"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-[#F5DEB3] hover:text-white transition-all duration-300 transform hover:scale-125"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#F5DEB3] hover:text-white text-sm transition-colors duration-300">{t('header.marketplace')}</a></li>
              <li><a href="#" className="text-[#F5DEB3] hover:text-white text-sm transition-colors duration-300">{t('footer.howToSell')}</a></li>
              <li><a href="#" className="text-[#F5DEB3] hover:text-white text-sm transition-colors duration-300">{t('header.dashboard')}</a></li>
              <li><a href="#" className="text-[#F5DEB3] hover:text-white text-sm transition-colors duration-300">{t('footer.logistics')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#F5DEB3] hover:text-white text-sm transition-colors duration-300">{t('footer.helpCenter')}</a></li>
              <li><a href="#" className="text-[#F5DEB3] hover:text-white text-sm transition-colors duration-300">{t('footer.contactUs')}</a></li>
              <li><a href="#" className="text-[#F5DEB3] hover:text-white text-sm transition-colors duration-300">{t('footer.faqs')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.stayUpdated')}</h4>
            <p className="text-[#F5DEB3] text-sm mb-2">{t('footer.newsletter')}</p>
            <form className="flex">
              <input type="email" placeholder={t('footer.yourEmail')} className="w-full bg-white/20 text-white placeholder-[#F5DEB3]/70 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#F5DEB3] border border-[#654321]" />
              <button type="submit" className="group relative bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold px-5 py-2.5 rounded-r-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 border-2 border-[#654321]/30 active:scale-105 active:translate-y-0">
                  <span className="relative z-10">{t('footer.go')}</span>
                  <span className="absolute inset-0 bg-white/20 rounded-r-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-[#654321] pt-8 text-center text-[#F5DEB3] opacity-90 text-sm">
          <p>{t('footer.copyright').replace('{year}', currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;