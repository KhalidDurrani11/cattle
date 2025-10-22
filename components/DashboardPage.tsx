import React, { useState } from 'react';
import { MOCK_CATTLE_DATA } from '../constants';
import { User, Role, Cattle, VerificationStatus, VerificationItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AddCattleModal from './AddCattleModal';

type DashboardTab = 'overview' | 'listings' | 'profile';

const MOCK_VERIFICATION_DATA: VerificationItem[] = [
    { id: 'v1', title: 'Phone Verification', status: VerificationStatus.VERIFIED, description: 'Your phone number has been successfully verified.', actionText: 'Verified' },
    { id: 'v2', title: 'CNIC Verification', status: VerificationStatus.PENDING, description: 'Upload a clear photo of the front and back of your CNIC.', actionText: 'Upload Document' },
    { id: 'v3', title: 'Farm License', status: VerificationStatus.NOT_SUBMITTED, description: 'A valid farm license is required to sell cattle on the platform.', actionText: 'Upload License' },
];

const statusStyles = {
    [VerificationStatus.VERIFIED]: {
        icon: 'fas fa-check-circle',
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        buttonDisabled: true,
    },
    [VerificationStatus.PENDING]: {
        icon: 'fas fa-clock',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        buttonDisabled: false,
    },
    [VerificationStatus.REJECTED]: {
        icon: 'fas fa-times-circle',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        buttonDisabled: false,
    },
    [VerificationStatus.NOT_SUBMITTED]: {
        icon: 'fas fa-exclamation-circle',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        buttonDisabled: false,
    },
};


const ProfileVerification: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div>
            <h3 className="text-xl font-bold text-white mb-2">Profile Verification & KYC</h3>
            <p className="text-gray-400 mb-6">Complete verification to build trust and unlock all platform features.</p>
            <div className="space-y-4">
               {MOCK_VERIFICATION_DATA.map(item => {
                   const styles = statusStyles[item.status];
                   return (
                        <div key={item.id} className={`p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center border ${styles.borderColor} ${styles.bgColor}`}>
                            <div className="flex-1 mb-4 sm:mb-0">
                                <div className="flex items-center gap-3">
                                    <i className={`${styles.icon} ${styles.color} text-xl`}></i>
                                    <div>
                                        <p className="font-semibold text-white">{item.title}</p>
                                        <p className={`text-sm font-medium ${styles.color}`}>{item.status}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 pl-8">{item.description}</p>
                            </div>
                            <button 
                                disabled={styles.buttonDisabled}
                                className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed flex-shrink-0">
                                {item.actionText}
                            </button>
                        </div>
                   )
               })}
            </div>
        </div>
    );
};


const FarmerDashboardContent: React.FC<{ activeTab: DashboardTab }> = ({ activeTab }) => {
    const mySalesData = [
        { name: 'Jan', sales: 4, revenue: 800000 },
        { name: 'Feb', sales: 2, revenue: 450000 },
        { name: 'Mar', sales: 5, revenue: 1100000 },
        { name: 'Apr', sales: 3, revenue: 700000 },
    ];
    
    if (activeTab === 'listings') {
        return (
             <div>
                 <h3 className="text-xl font-bold text-white mb-4">My Listings</h3>
                 <div className="overflow-x-auto bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                     <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-3">Breed</th>
                                <th className="p-3">Price (PKR)</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_CATTLE_DATA.slice(0, 3).map(c => (
                                <tr key={c.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                                    <td className="p-3">{c.breed}</td>
                                    <td className="p-3">{c.price.toLocaleString()}</td>
                                    <td className="p-3"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">Active</span></td>
                                    <td className="p-3">
                                        <button className="text-teal-400 hover:text-teal-300 mr-2"><i className="fas fa-edit"></i></button>
                                        <button className="text-red-500 hover:text-red-400"><i className="fas fa-trash"></i></button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                    <h3 className="text-gray-400 text-sm font-medium">Total Listings</h3>
                    <p className="text-3xl font-bold text-white">12</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                    <h3 className="text-gray-400 text-sm font-medium">Total Sales</h3>
                    <p className="text-3xl font-bold text-teal-400">PKR 3.2M</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                    <h3 className="text-gray-400 text-sm font-medium">Profile Verification</h3>
                    <p className="text-2xl font-bold text-yellow-400 flex items-center gap-2">Pending <i className="fas fa-exclamation-circle"></i></p>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Sales Analytics</h3>
                 <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 h-96">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mySalesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                            <XAxis dataKey="name" stroke="#A0AEC0"/>
                            <YAxis stroke="#A0AEC0"/>
                            <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }}/>
                            <Legend />
                            <Bar dataKey="sales" fill="#38B2AC" name="Units Sold" />
                            <Bar dataKey="revenue" fill="#4299E1" name="Revenue (PKR)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

interface DashboardPageProps {
    user: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddCattle = (cattleData: Omit<Cattle, 'id' | 'sellerId' | 'dateListed'>) => {
        console.log("New cattle added:", cattleData);
        // Here you would typically update your state or send to an API
        setIsAddModalOpen(false);
    };

    const renderContent = () => {
        if (activeTab === 'profile') {
            return <ProfileVerification user={user} />;
        }
        if (user.role === Role.FARMER) {
            return <FarmerDashboardContent activeTab={activeTab} />;
        }
        // Add other role dashboards here
        return <div className="text-center text-gray-400 py-12">Dashboard for {user.role} is coming soon.</div>;
    };

    return (
        <>
            <AddCattleModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAddCattle={handleAddCattle} 
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-white mb-8">My Dashboard</h1>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2 border-b border-gray-700">
                        <button 
                            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('overview')}>
                            Overview
                        </button>
                        {user.role === Role.FARMER && (
                            <button 
                                className={`px-4 py-2 font-medium ${activeTab === 'listings' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
                                onClick={() => setActiveTab('listings')}>
                                My Listings
                            </button>
                        )}
                        <button 
                            className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('profile')}>
                            Profile & Verification
                        </button>
                    </div>
                    {user.role === Role.FARMER && (
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors duration-300 flex items-center gap-2">
                            <i className="fas fa-plus-circle"></i> Add New Cattle
                        </button>
                    )}
                </div>
                
                <div className="bg-gray-800/30 p-8 rounded-2xl shadow-lg border border-gray-700/30">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default DashboardPage;