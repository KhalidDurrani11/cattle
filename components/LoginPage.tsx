import React, { useState } from 'react';
import { Page, User, Role } from '../types';
import { MOCK_USERS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface LoginPageProps {
  onLogin: (user: User) => void;
  setCurrentPage: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, setCurrentPage }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { t } = useTranslation();
  
  // Dummy login handler that finds a user of a specific role
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const role = formData.get('role') as Role;
    
    // Find the first mock user with the selected role
    const userToLogin = MOCK_USERS.find(user => user.role === role);

    if (userToLogin) {
      onLogin(userToLogin);
    } else {
      // Fallback to the first user if no user of that role is found
      onLogin(MOCK_USERS[0]);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would register the user and then log them in.
    // For this demo, we'll just log them in with a new user object.
     onLogin({ id: 'u_new', name: 'New User', email: 'new@test.com', role: Role.FARMER, isVerified: false, rating: 0, ratingCount: 0, location: 'New Location' });
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/90 p-10 rounded-2xl shadow-2xl border border-[#8B4513]/30 backdrop-blur-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#654321]">
            {isLoginView ? t('login.signInTitle') : t('login.createAccountTitle')}
          </h2>
        </div>

        <div className="flex justify-center border-b border-[#8B4513]/30">
          <button onClick={() => setIsLoginView(true)} className={`px-6 py-2 font-medium text-sm transition-all duration-300 ${isLoginView ? 'border-b-2 border-[#8B4513] text-[#8B4513]' : 'text-[#8eb1c2] hover:text-[#A0522D]'}`}>
            {t('login.login')}
          </button>
          <button onClick={() => setIsLoginView(false)} className={`px-6 py-2 font-medium text-sm transition-all duration-300 ${!isLoginView ? 'border-b-2 border-[#8B4513] text-[#8B4513]' : 'text-[#8eb1c2] hover:text-[#A0522D]'}`}>
            {t('login.register')}
          </button>
        </div>

        {isLoginView ? (
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#8B4513]/30 bg-white placeholder-[#8B4513]/50 text-[#654321] rounded-t-md focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] focus:z-10 sm:text-sm" placeholder={t('login.email')} />
              </div>
              <div>
                <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#8B4513]/30 bg-white placeholder-[#8B4513]/50 text-[#654321] rounded-b-md focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] focus:z-10 sm:text-sm" placeholder={t('login.password')} />
              </div>
            </div>
             <div>
                <label htmlFor="role-login" className="sr-only">{t('login.role')}</label>
                 <select id="role-login" name="role" defaultValue={Role.FARMER} required className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30">
                    <option value="" disabled>{t('login.selectRole')}</option>
                    <option value={Role.FARMER}>{t('login.farmer')}</option>
                    <option value={Role.TRADER}>{t('login.trader')}</option>
                    <option value={Role.VET}>{t('login.vet')}</option>
               </select>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border-2 border-[#8B4513] text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] focus:outline-none focus:ring-4 focus:ring-[#8B4513]/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 active:scale-100 active:translate-y-0">
              <span className="relative z-10">{t('login.signIn')}</span>
              <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
               <input name="name" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 bg-white placeholder-[#8B4513]/50 text-[#654321] rounded-md focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm" placeholder={t('login.fullName')} />
               <input name="email" type="email" required className="appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 bg-white placeholder-[#8B4513]/50 text-[#654321] rounded-md focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm" placeholder={t('login.email')} />
               <input name="password" type="password" required className="appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 bg-white placeholder-[#8B4513]/50 text-[#654321] rounded-md focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm" placeholder={t('login.password')} />
               <select name="role" required className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30">
                    <option value="" disabled>{t('login.selectRole')}</option>
                    <option value={Role.FARMER}>{t('login.farmer')}</option>
                    <option value={Role.TRADER}>{t('login.trader')}</option>
                    <option value={Role.VET}>{t('login.vet')}</option>
               </select>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border-2 border-[#8B4513] text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] focus:outline-none focus:ring-4 focus:ring-[#8B4513]/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 active:scale-100 active:translate-y-0">
              <span className="relative z-10">{t('login.createAccount')}</span>
              <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;