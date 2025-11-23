import React, { useState, useMemo } from 'react';
import { MOCK_CATTLE_DATA } from '../constants';
import { User, Role, Cattle, VerificationStatus, VerificationItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AddCattleModal from './AddCattleModal';
import { useTranslation } from '../hooks/useTranslation';

type DashboardTab = 'overview' | 'listings' | 'profile' | 'purchases' | 'analytics' | 'verification';

const MOCK_VERIFICATION_DATA: VerificationItem[] = [
    { id: 'v1', title: 'Phone Verification', status: VerificationStatus.VERIFIED, description: 'Your phone number has been successfully verified.', actionText: 'Verified' },
    { id: 'v3', title: 'Farm License', status: VerificationStatus.NOT_SUBMITTED, description: 'A valid farm license is required to sell cattle on the platform.', actionText: 'Upload License' },
];

const statusStyles = {
    [VerificationStatus.VERIFIED]: {
        icon: 'fas fa-check-circle',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
        progressBarColor: 'bg-emerald-500',
        buttonDisabled: true,
    },
    [VerificationStatus.PENDING]: {
        icon: 'fas fa-clock',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        progressBarColor: 'bg-amber-500',
        buttonDisabled: false,
    },
    [VerificationStatus.REJECTED]: {
        icon: 'fas fa-times-circle',
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30',
        progressBarColor: 'bg-rose-500',
        buttonDisabled: false,
    },
    [VerificationStatus.NOT_SUBMITTED]: {
        icon: 'fas fa-exclamation-circle',
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30',
        progressBarColor: 'bg-rose-500',
        buttonDisabled: false,
    },
};


const ProfileVerification: React.FC<{ user: User }> = ({ user }) => {
    const verifiedCount = useMemo(() => MOCK_VERIFICATION_DATA.filter(item => item.status === VerificationStatus.VERIFIED).length, []);
    const totalItems = MOCK_VERIFICATION_DATA.length;
    const progressPercentage = (verifiedCount / totalItems) * 100;

    return (
        <div>
            <h3 className="text-xl font-bold text-[#654321] mb-2">Profile Verification & KYC</h3>
            <p className="text-[#8B4513] mb-6">Complete verification to build trust and unlock all platform features.</p>
            
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-[#654321]">Overall Progress</span>
                    <span className="text-sm font-medium text-[#8B4513]">{verifiedCount} of {totalItems} Steps Completed</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <div className="space-y-4">
               {MOCK_VERIFICATION_DATA.map(item => {
                   const styles = statusStyles[item.status];
                   return (
                        <div key={item.id} className={`p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center border ${styles.borderColor} ${styles.bgColor} border-l-4 transition-all hover:bg-white/5`}>
                            <div className="flex-1 mb-4 sm:mb-0">
                                <div className="flex items-center gap-3">
                                    <i className={`${styles.icon} ${styles.color} text-xl`}></i>
                                    <div>
                                        <p className="font-semibold text-[#654321]">{item.title}</p>
                                        <p className={`text-sm font-medium ${styles.color}`}>{item.status}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-[#8B4513] mt-2 pl-8 rtl:pr-8 rtl:pl-0">{item.description}</p>
                            </div>
                            <button 
                                disabled={styles.buttonDisabled}
                                className="group relative px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 border-2 border-[#654321]/30 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:transform-none disabled:border-gray-400 disabled:shadow-none flex-shrink-0 active:scale-100 active:translate-y-0">
                                <span className="relative z-10">{item.actionText}</span>
                                <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left disabled:hidden"></span>
                            </button>
                        </div>
                   )
               })}
            </div>
        </div>
    );
};


const FarmerDashboardContent: React.FC<{ activeTab: DashboardTab }> = ({ activeTab }) => {
    // FIX: Destructure language from useTranslation to use it in the component.
    const { t, language } = useTranslation();
    const mySalesData = [
        // FIX: The `t` function expects only one argument (the key). The second argument has been removed.
        { name: t('dashboard.jan'), sales: 4, revenue: 800000 },
        { name: t('dashboard.feb'), sales: 2, revenue: 450000 },
        { name: t('dashboard.mar'), sales: 5, revenue: 1100000 },
        { name: t('dashboard.apr'), sales: 3, revenue: 700000 },
    ];
    
    if (activeTab === 'listings') {
        return (
             <div>
                 <h3 className="text-xl font-bold text-[#654321] mb-4">{t('dashboard.myListings')}</h3>
                 <div className="overflow-x-auto bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-[#8B4513]/30 shadow-md">
                     <table className="w-full text-left rtl:text-right">
                        <thead>
                            <tr className="border-b border-[#8B4513]/30">
                                <th className="p-3 text-[#654321]">Breed</th>
                                <th className="p-3 text-[#654321]">Price (PKR)</th>
                                <th className="p-3 text-[#654321]">Status</th>
                                <th className="p-3 text-[#654321]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_CATTLE_DATA.slice(0, 3).map(c => (
                                <tr key={c.id} className="border-b border-[#8B4513]/30 hover:bg-[#8B4513]/10 transition-colors">
                                    <td className="p-3 text-[#654321]">{c.breed}</td>
                                    <td className="p-3 text-[#654321]">{c.price.toLocaleString()}</td>
                                    <td className="p-3"><span className="bg-green-500/20 text-green-600 px-2 py-1 rounded-full text-xs">Active</span></td>
                                    <td className="p-3">
                                        <button className="text-[#8B4513] hover:text-[#A0522D] ml-2 rtl:ml-0 rtl:mr-2 transition-all duration-300 transform hover:scale-125"><i className="fas fa-edit"></i></button>
                                        <button className="text-red-600 hover:text-red-500 transition-all duration-300 transform hover:scale-125"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                 </div>
            </div>
        );
    }
    
    // Default to overview
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#654321]">{t('dashboard.farmerDashboard')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.totalListings')}</h3>
                    <p className="text-3xl font-bold text-[#654321]">12</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.totalSales')}</h3>
                    <p className="text-3xl font-bold text-[#8B4513]">PKR 3.2M</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.verificationStatus')}</h3>
                    <p className="text-2xl font-bold text-[#A0522D] flex items-center gap-2">{t('dashboard.pending')} <i className="fas fa-exclamation-circle"></i></p>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-[#654321] mb-4">{t('dashboard.salesAnalytics')}</h3>
                 <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 h-96 shadow-md">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mySalesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#365563" />
                            <XAxis dataKey="name" stroke="#8eb1c2"/>
                            <YAxis stroke="#8eb1c2" width={language === 'ur' ? 0 : undefined}/>
                            <Tooltip contentStyle={{ backgroundColor: '#1a2b34', border: '1px solid #365563' }}/>
                            <Legend />
                            <Bar dataKey="sales" fill="#537d90" name={t('dashboard.unitsSold')} />
                            <Bar dataKey="revenue" fill="#acc8d7" name={t('dashboard.revenue')} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const BuyerDashboardContent: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#654321]">{t('dashboard.buyerDashboard')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.myPurchases')}</h3>
                    <p className="text-3xl font-bold text-[#654321]">5</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.savedListings')}</h3>
                    <p className="text-3xl font-bold text-[#8B4513]">8</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.verificationStatus')}</h3>
                    <p className="text-2xl font-bold text-green-600 flex items-center gap-2">{t('dashboard.verified')} <i className="fas fa-check-circle"></i></p>
                </div>
            </div>
            {/* Add more buyer-specific content here */}
        </div>
    );
};

const TraderDashboardContent: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#654321]">{t('dashboard.traderDashboard')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.currentInventory')}</h3>
                    <p className="text-3xl font-bold text-[#654321]">25</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.profitMargin')}</h3>
                    <p className="text-3xl font-bold text-green-600">+18%</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.marketVelocity')}</h3>
                    <p className="text-3xl font-bold text-[#8B4513]">High</p>
                </div>
            </div>
            {/* Add more trader-specific content here */}
        </div>
    );
};

const VetDashboardContent: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#654321]">{t('dashboard.vetDashboard')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.awaitingVerification')}</h3>
                    <p className="text-3xl font-bold text-[#A0522D]">3</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.recentlyVerified')}</h3>
                    <p className="text-3xl font-bold text-green-600">15</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#8B4513]/30 shadow-md flex flex-col justify-center">
                    <h3 className="text-[#8B4513] text-sm font-medium">{t('dashboard.searchByTag')}</h3>
                    <input type="text" placeholder="Enter Tag ID..." className="mt-2 w-full bg-white/80 border border-[#8B4513]/30 rounded-lg px-3 py-1.5 text-[#654321] focus:outline-none focus:ring-1 focus:ring-[#8B4513]" />
                </div>
            </div>
            {/* Add more vet-specific content here */}
        </div>
    );
};


interface DashboardPageProps {
    user: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { t, language } = useTranslation();

    const handleAddCattle = (cattleData: Omit<Cattle, 'id' | 'sellerId' | 'dateListed'>) => {
        // Here you would typically update your state or send to an API
        if (process.env.NODE_ENV === 'development') {
            console.log("New cattle added:", cattleData);
        }
        setIsAddModalOpen(false);
    };

    const renderContent = () => {
        if (activeTab === 'profile') {
            return <ProfileVerification user={user} />;
        }
        
        switch (user.role) {
            case Role.FARMER:
                return <FarmerDashboardContent activeTab={activeTab} />;
            case Role.BUYER:
                return <BuyerDashboardContent />;
            case Role.TRADER:
                return <TraderDashboardContent />;
            case Role.VET:
                return <VetDashboardContent />;
            default:
                return <div className="text-center text-[#8B4513] py-12">Dashboard for {user.role} is coming soon.</div>;
        }
    };

    return (
        <>
            <AddCattleModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAddCattle={handleAddCattle} 
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-[#654321] mb-8">{t('dashboard.myDashboard')}</h1>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2 border-b border-[#365563]">
                        <button 
                            className={`px-4 py-2 font-medium transition-all duration-300 ${activeTab === 'overview' ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-[#654321] hover:text-[#8B4513]'}`}
                            onClick={() => setActiveTab('overview')}>
                            {t('dashboard.overview')}
                        </button>
                        {user.role === Role.FARMER && (
                            <button 
                                className={`px-4 py-2 font-medium transition-all duration-300 ${activeTab === 'listings' ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-[#654321] hover:text-[#8B4513]'}`}
                                onClick={() => setActiveTab('listings')}>
                                {t('dashboard.myListings')}
                            </button>
                        )}
                        <button 
                            className={`px-4 py-2 font-medium transition-all duration-300 ${activeTab === 'profile' ? 'text-[#8B4513] border-b-2 border-[#8B4513]' : 'text-[#654321] hover:text-[#8B4513]'}`}
                            onClick={() => setActiveTab('profile')}>
                            {t('dashboard.profileVerification')}
                        </button>
                    </div>
                    {user.role === Role.FARMER && (
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="group relative px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all duration-300 flex items-center gap-2 transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 border-2 border-[#654321]/30 active:scale-105 active:translate-y-0">
                            <span className="relative z-10"><i className="fas fa-plus-circle"></i> {t('dashboard.addNewCattle')}</span>
                            <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </button>
                    )}
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-[#8B4513]/30">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default DashboardPage;