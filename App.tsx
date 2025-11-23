import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MarketplacePage from './components/MarketplacePage';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import SellerProfilePage from './components/SellerProfilePage';
import { Page, User } from './types';
import { LanguageContext } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [appVisible, setAppVisible] = useState(false);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    setAppVisible(true);
  }, []);
  
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);


  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage(Page.HOME);
  };

  const handleViewSeller = (sellerId: string) => {
    setSelectedSellerId(sellerId);
    setCurrentPage(Page.SELLER_PROFILE);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.MARKETPLACE:
        return <MarketplacePage onViewSeller={handleViewSeller} />;
      case Page.DASHBOARD:
        return user ? <DashboardPage user={user} /> : <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />;
      case Page.LOGIN:
        return <LoginPage onLogin={handleLogin} setCurrentPage={setCurrentPage} />;
      case Page.SELLER_PROFILE:
        return selectedSellerId ? <SellerProfilePage sellerId={selectedSellerId} onViewSeller={handleViewSeller} /> : <HomePage setCurrentPage={setCurrentPage} onViewSeller={handleViewSeller} />;
      case Page.HOME:
      default:
        return <HomePage setCurrentPage={setCurrentPage} onViewSeller={handleViewSeller} />;
    }
  };

  return (
    <div className={`bg-[#F5F5DC] text-[#2c3e50] min-h-screen font-sans transition-opacity duration-1000 ${appVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;