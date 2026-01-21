import React from 'react';
import { Loader2 } from 'lucide-react';
import { Product } from '@/app/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    loadMoreRef: React.Ref<HTMLDivElement>;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    loadMoreRef,
    isFetchingNextPage,
    hasNextPage
}) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div ref={loadMoreRef} className="mt-8 flex justify-center">
                {isFetchingNextPage && (
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                )}
                {!hasNextPage && products.length > 0 && (
                    <p className="text-gray-500 text-sm">No more products to load</p>
                )}
            </div>
        </>
    );
};

export default ProductGrid;
