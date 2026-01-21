"use client";

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import ProductListEmpty from './ProductListEmpty';
import ProductListError from './ProductListError';
import ProductListLoading from './ProductListLoading';
import { fetchProducts } from '@/api/products';
import { SortOption } from '@/app/types';


const ProductListing: React.FC = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sort, setSort] = useState<SortOption>('none');
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['products', debouncedSearch, sort],
        queryFn: ({ pageParam = 0 }) => fetchProducts({ pageParam, search: debouncedSearch, sort }),
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce((sum, page) => sum + page.products.length, 0);
            return totalFetched < lastPage.total ? allPages.length : undefined;
        },
        initialPageParam: 0,
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = loadMoreRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const allProducts = data?.pages.flatMap(page => page.products) || [];
    const totalProducts = data?.pages[0]?.total || 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <ProductFilters
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                totalProducts={totalProducts}
                isLoading={isLoading}
                debouncedSearch={debouncedSearch}
            />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {isLoading && <ProductListLoading />}

                {isError && <ProductListError message={(error as Error).message} />}

                {!isLoading && !isError && allProducts.length === 0 && <ProductListEmpty />}

                {!isLoading && !isError && allProducts.length > 0 && (
                    <ProductGrid
                        products={allProducts}
                        loadMoreRef={loadMoreRef}
                        isFetchingNextPage={isFetchingNextPage}
                        hasNextPage={hasNextPage}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductListing;