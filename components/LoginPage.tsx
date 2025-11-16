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
      <div className="max-w-md w-full space-y-8 bg-[#253f4b]/50 p-10 rounded-2xl shadow-2xl border border-[#365563]/50 backdrop-blur-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLoginView ? t('login.signInTitle') : t('login.createAccountTitle')}
          </h2>
        </div>

        <div className="flex justify-center border-b border-[#365563]">
          <button onClick={() => setIsLoginView(true)} className={`px-6 py-2 font-medium text-sm ${isLoginView ? 'border-b-2 border-[#acc8d7] text-[#acc8d7]' : 'text-[#8eb1c2]'}`}>
            {t('login.login')}
          </button>
          <button onClick={() => setIsLoginView(false)} className={`px-6 py-2 font-medium text-sm ${!isLoginView ? 'border-b-2 border-[#acc8d7] text-[#acc8d7]' : 'text-[#8eb1c2]'}`}>
            {t('login.register')}
          </button>
        </div>

        {isLoginView ? (
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#365563] bg-[#1a2b34] placeholder-stone-500 text-white rounded-t-md focus:outline-none focus:ring-[#537d90] focus:border-[#537d90] focus:z-10 sm:text-sm" placeholder={t('login.email')} />
              </div>
              <div>
                <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#365563] bg-[#1a2b34] placeholder-stone-500 text-white rounded-b-md focus:outline-none focus:ring-[#537d90] focus:border-[#537d90] focus:z-10 sm:text-sm" placeholder={t('login.password')} />
              </div>
            </div>
             <div>
                <label htmlFor="role-login" className="sr-only">{t('login.role')}</label>
                 <select id="role-login" name="role" defaultValue={Role.FARMER} required className="w-full bg-[#1a2b34] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#537d90] border border-[#365563]">
                    <option value="" disabled>{t('login.selectRole')}</option>
                    <option value={Role.FARMER}>{t('login.farmer')}</option>
                    <option value={Role.BUYER}>{t('login.buyer')}</option>
                    <option value={Role.TRADER}>{t('login.trader')}</option>
                    <option value={Role.VET}>{t('login.vet')}</option>
               </select>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#446879] hover:bg-[#537d90] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#537d90]">
              {t('login.signIn')}
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
               <input name="name" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-[#365563] bg-[#1a2b34] placeholder-stone-500 text-white rounded-md focus:outline-none focus:ring-[#537d90] focus:border-[#537d90] sm:text-sm" placeholder={t('login.fullName')} />
               <input name="email" type="email" required className="appearance-none relative block w-full px-3 py-2 border border-[#365563] bg-[#1a2b34] placeholder-stone-500 text-white rounded-md focus:outline-none focus:ring-[#537d90] focus:border-[#537d90] sm:text-sm" placeholder={t('login.email')} />
               <input name="password" type="password" required className="appearance-none relative block w-full px-3 py-2 border border-[#365563] bg-[#1a2b34] placeholder-stone-500 text-white rounded-md focus:outline-none focus:ring-[#537d90] focus:border-[#537d90] sm:text-sm" placeholder={t('login.password')} />
               <select name="role" required className="w-full bg-[#1a2b34] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#537d90] border border-[#365563]">
                    <option value="" disabled>{t('login.selectRole')}</option>
                    <option value={Role.FARMER}>{t('login.farmer')}</option>
                    <option value={Role.BUYER}>{t('login.buyer')}</option>
                    <option value={Role.TRADER}>{t('login.trader')}</option>
                    <option value={Role.VET}>{t('login.vet')}</option>
               </select>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#446879] hover:bg-[#537d90] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#537d90]">
              {t('login.createAccount')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;