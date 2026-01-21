import React from 'react';
import { Search, SortAsc } from 'lucide-react';
import { SortOption } from '@/app/types';

interface ProductFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    sort: SortOption;
    setSort: (value: SortOption) => void;
    totalProducts: number;
    isLoading: boolean;
    debouncedSearch: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    search,
    setSearch,
    sort,
    setSort,
    totalProducts,
    isLoading,
    debouncedSearch,
}) => {
    return (
        <div className="bg-white shadow-sm sticky top-0 z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Store</h1>

                {/* Search and Sort Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder:text-gray-500"
                        />
                    </div>

                    {/* Sort */}
                    <div className="sm:w-64">
                        <div className="relative">
                            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortOption)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                            >
                                <option value="none">Default Sort</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results count */}
                {!isLoading && (
                    <div className="mt-4 text-sm text-gray-600">
                        {debouncedSearch && `Search results for "${debouncedSearch}" - `}
                        {totalProducts} products found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFilters;
