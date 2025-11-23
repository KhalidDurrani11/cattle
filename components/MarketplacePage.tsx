import React, { useState, useMemo } from 'react';
import CattleCard from './CattleCard';
import { MOCK_CATTLE_DATA } from '../constants';
import { Cattle } from '../types';
import CattleDetailsModal from './CattleDetailsModal';

const uniqueBreeds = [...new Set(MOCK_CATTLE_DATA.map(c => c.breed))];
const uniqueLocations = [...new Set(MOCK_CATTLE_DATA.map(c => c.location))];

interface MarketplacePageProps {
    onViewSeller: (sellerId: string) => void;
}

const MarketplacePage: React.FC<MarketplacePageProps> = ({ onViewSeller }) => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        breed: 'Any Breed',
        location: 'Any Location',
        minAge: '',
        maxAge: '',
        minWeight: '',
        maxWeight: '',
        isVerified: 'any',
    });
    const [sortBy, setSortBy] = useState('dateListed-desc');
    const [selectedCattle, setSelectedCattle] = useState<Cattle | null>(null);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredAndSortedCattle = useMemo(() => {
        let filtered = MOCK_CATTLE_DATA.filter(cattle => {
            const searchTermMatch = filters.searchTerm === '' || 
                cattle.breed.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                cattle.location.toLowerCase().includes(filters.searchTerm.toLowerCase());
            
            const breedMatch = filters.breed === 'Any Breed' || cattle.breed === filters.breed;
            const locationMatch = filters.location === 'Any Location' || cattle.location === filters.location;
            const verifiedMatch = filters.isVerified === 'any' || (filters.isVerified === 'yes' && cattle.isVerified) || (filters.isVerified === 'no' && !cattle.isVerified);
            const minAgeMatch = filters.minAge === '' || cattle.age >= parseFloat(filters.minAge);
            const maxAgeMatch = filters.maxAge === '' || cattle.age <= parseFloat(filters.maxAge);
            const minWeightMatch = filters.minWeight === '' || cattle.weight >= parseFloat(filters.minWeight);
            const maxWeightMatch = filters.maxWeight === '' || cattle.weight <= parseFloat(filters.maxWeight);

            return searchTermMatch && breedMatch && locationMatch && verifiedMatch && minAgeMatch && maxAgeMatch && minWeightMatch && maxWeightMatch;
        });

        return [...filtered].sort((a, b) => {
            const [key, direction] = sortBy.split('-');
            const valA = a[key as keyof Cattle];
            const valB = b[key as keyof Cattle];

            if (valA < valB) return direction === 'asc' ? -1 : 1;
            if (valA > valB) return direction === 'asc' ? 1 : -1;
            return 0;
        });

    }, [filters, sortBy]);

    return (
        <>
            <CattleDetailsModal cattle={selectedCattle} onClose={() => setSelectedCattle(null)} onViewSeller={onViewSeller} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-[#8B4513]/30 mb-12">
                    <h1 className="text-3xl font-bold text-[#654321] mb-4">Marketplace</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input type="text" placeholder="Search by breed, location..." name="searchTerm" value={filters.searchTerm} onChange={handleFilterChange} className="lg:col-span-4 bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]" />
                        
                        <select name="breed" value={filters.breed} onChange={handleFilterChange} className="bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]">
                            <option>Any Breed</option>
                            {uniqueBreeds.map(b => <option key={b}>{b}</option>)}
                        </select>
                         <select name="location" value={filters.location} onChange={handleFilterChange} className="bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]">
                            <option>Any Location</option>
                            {uniqueLocations.map(l => <option key={l}>{l}</option>)}
                        </select>
                        <select name="isVerified" value={filters.isVerified} onChange={handleFilterChange} className="bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]">
                            <option value="any">Any Health Status</option>
                            <option value="yes">Verified</option>
                            <option value="no">Unverified</option>
                        </select>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]">
                            <option value="dateListed-desc">Sort by: Newest</option>
                            <option value="price-asc">Sort by: Price (Low to High)</option>
                            <option value="price-desc">Sort by: Price (High to Low)</option>
                            <option value="age-asc">Sort by: Age (Youngest First)</option>
                            <option value="age-desc">Sort by: Age (Oldest First)</option>
                            <option value="weight-asc">Sort by: Weight (Lightest First)</option>
                            <option value="weight-desc">Sort by: Weight (Heaviest First)</option>
                        </select>
                        <div className="flex items-center gap-2">
                             <input type="number" placeholder="Min Age" name="minAge" value={filters.minAge} onChange={handleFilterChange} className="w-full bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]" />
                             <input type="number" placeholder="Max Age" name="maxAge" value={filters.maxAge} onChange={handleFilterChange} className="w-full bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]" />
                        </div>
                         <div className="flex items-center gap-2">
                             <input type="number" placeholder="Min Weight" name="minWeight" value={filters.minWeight} onChange={handleFilterChange} className="w-full bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]" />
                             <input type="number" placeholder="Max Weight" name="maxWeight" value={filters.maxWeight} onChange={handleFilterChange} className="w-full bg-white/80 border border-[#8B4513]/30 rounded-lg px-4 py-2 text-[#654321] focus:outline-none focus:ring-2 focus:ring-[#8B4513]" />
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredAndSortedCattle.map(cattle => (
                        <CattleCard key={cattle.id} cattle={cattle} onViewDetails={setSelectedCattle} onViewSeller={onViewSeller} />
                    ))}
                </div>
                 {filteredAndSortedCattle.length === 0 && (
                    <div className="text-center col-span-full py-12">
                        <p className="text-xl text-[#8B4513]">No cattle match the current filters.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default MarketplacePage;