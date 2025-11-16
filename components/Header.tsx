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
          ? 'bg-[#446879]/20 text-[#acc8d7]'
          : 'text-[#8eb1c2] hover:text-white hover:bg-[#253f4b]/50'
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a2b34]/80 backdrop-blur-lg border-b border-[#365563]/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage(Page.HOME)} className="flex-shrink-0 flex items-center gap-2">
              <i className="fas fa-cow text-2xl text-[#608da2]"></i>
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
                <button onClick={() => setLanguage('en')} className={`font-semibold ${language === 'en' ? 'text-[#acc8d7]' : 'text-[#8eb1c2] hover:text-white'}`}>{t('header.en')}</button>
                <span className="text-[#365563]">|</span>
                <button onClick={() => setLanguage('ur')} className={`font-semibold ${language === 'ur' ? 'text-[#acc8d7]' : 'text-[#8eb1c2] hover:text-white'}`}>{t('header.ur')}</button>
             </div>
             {user ? (
                <div className="flex items-center space-x-4">
                    <span className="text-white hidden sm:block">{t('header.welcome')}, {user.name}</span>
                    <button 
                        onClick={onLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors duration-300 shadow-md">
                        {t('header.logout')}
                    </button>
                </div>
             ) : (
                <button 
                    onClick={() => setCurrentPage(Page.LOGIN)}
                    className="px-4 py-2 bg-[#446879] text-white rounded-lg hover:bg-[#537d90] transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(68,104,121,0.5)]">
                    {t('header.loginRegister')}
                </button>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;