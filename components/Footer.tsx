import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#253f4b]/50 border-t border-[#365563]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">{t('header.agriTradeX')}</h3>
            <p className="text-[#8eb1c2] text-sm">{t('footer.subtitle')}</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-[#8eb1c2] hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-[#8eb1c2] hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-[#8eb1c2] hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#8eb1c2] hover:text-[#acc8d7] text-sm">{t('header.marketplace')}</a></li>
              <li><a href="#" className="text-[#8eb1c2] hover:text-[#acc8d7] text-sm">{t('footer.howToSell')}</a></li>
              <li><a href="#" className="text-[#8eb1c2] hover:text-[#acc8d7] text-sm">{t('header.dashboard')}</a></li>
              <li><a href="#" className="text-[#8eb1c2] hover:text-[#acc8d7] text-sm">{t('footer.logistics')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#8eb1c2] hover:text-[#acc8d7] text-sm">{t('footer.helpCenter')}</a></li>
              <li><a href="#" className="text-[#8eb1c2] hover:text-[#acc8d7] text-sm">{t('footer.contactUs')}</a></li>
              <li><a href="#" className="text-[#8eb1c2] hover:text-[#acc8d7] text-sm">{t('footer.faqs')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.stayUpdated')}</h4>
            <p className="text-[#8eb1c2] text-sm mb-2">{t('footer.newsletter')}</p>
            <form className="flex">
              <input type="email" placeholder={t('footer.yourEmail')} className="w-full bg-[#1a2b34] text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#537d90]" />
              <button type="submit" className="bg-[#446879] text-white px-4 py-2 rounded-r-md hover:bg-[#537d90] transition-colors">{t('footer.go')}</button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-[#365563] pt-8 text-center text-[#8eb1c2] opacity-70 text-sm">
          <p>{t('footer.copyright').replace('{year}', currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;