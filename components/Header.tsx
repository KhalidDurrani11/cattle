import React, { useContext } from 'react';
import { Page, User } from '../types';
import { LanguageContext } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: User | null;
  onLogout: () => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'bg-[#A0522D]/30 text-white'
          : 'text-[#F5DEB3] hover:text-white hover:bg-[#A0522D]/40 hover:scale-105'
      }`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, user, onLogout }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#8B4513] backdrop-blur-lg border-b border-[#654321] shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage(Page.HOME)} className="flex-shrink-0 flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <i className="fas fa-cow text-2xl text-[#F5DEB3]"></i>
              <span className="text-xl font-bold text-white">{t('header.agriTradeX')}</span>
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink page={Page.HOME} currentPage={currentPage} setCurrentPage={setCurrentPage}>{t('header.home')}</NavLink>
            <NavLink page={Page.MARKETPLACE} currentPage={currentPage} setCurrentPage={setCurrentPage}>{t('header.marketplace')}</NavLink>
            {user && <NavLink page={Page.DASHBOARD} currentPage={currentPage} setCurrentPage={setCurrentPage}>{t('header.dashboard')}</NavLink>}
          </nav>
          <div className="flex items-center space-x-4">
             <div className="hidden items-center space-x-2 md:flex">
                <button onClick={() => setLanguage('en')} className={`font-semibold transition-all duration-300 ${language === 'en' ? 'text-white' : 'text-[#F5DEB3] hover:text-white hover:scale-110'}`}>{t('header.en')}</button>
                <span className="text-[#654321]">|</span>
                <button onClick={() => setLanguage('ur')} className={`font-semibold transition-all duration-300 ${language === 'ur' ? 'text-white' : 'text-[#F5DEB3] hover:text-white hover:scale-110'}`}>{t('header.ur')}</button>
             </div>
             {user ? (
                <div className="flex items-center space-x-4">
                    <span className="text-white hidden sm:block">{t('header.welcome')}, {user.name}</span>
                    <button 
                        onClick={onLogout}
                        className="group relative px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/60 border-2 border-red-400/30 active:scale-105 active:translate-y-0">
                        <span className="relative z-10">{t('header.logout')}</span>
                        <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </button>
                </div>
             ) : (
                <button 
                    onClick={() => setCurrentPage(Page.LOGIN)}
                    className="group relative px-5 py-2.5 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all duration-300 shadow-lg transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/60 border-2 border-[#654321]/30 active:scale-105 active:translate-y-0">
                    <span className="relative z-10">{t('header.loginRegister')}</span>
                    <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;