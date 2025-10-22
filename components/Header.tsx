
import React from 'react';
import { Page, User } from '../types';

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
          ? 'bg-teal-500/10 text-teal-400'
          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
      }`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, user, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage(Page.HOME)} className="flex-shrink-0 flex items-center gap-2">
              <i className="fas fa-cow text-2xl text-teal-400"></i>
              <span className="text-xl font-bold text-white">AgriTradeX</span>
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink page={Page.HOME} currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavLink>
            <NavLink page={Page.MARKETPLACE} currentPage={currentPage} setCurrentPage={setCurrentPage}>Marketplace</NavLink>
            {user && <NavLink page={Page.DASHBOARD} currentPage={currentPage} setCurrentPage={setCurrentPage}>Dashboard</NavLink>}
          </nav>
          <div className="flex items-center space-x-4">
             <div className="hidden items-center space-x-2 md:flex">
                <button className="text-gray-400 hover:text-white">EN</button>
                <span className="text-gray-600">|</span>
                <button className="text-gray-400 hover:text-white">UR</button>
             </div>
             {user ? (
                <div className="flex items-center space-x-4">
                    <span className="text-white hidden sm:block">Welcome, {user.name}</span>
                    <button 
                        onClick={onLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors duration-300 shadow-md">
                        Logout
                    </button>
                </div>
             ) : (
                <button 
                    onClick={() => setCurrentPage(Page.LOGIN)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors duration-300 shadow-md">
                    Login / Register
                </button>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
