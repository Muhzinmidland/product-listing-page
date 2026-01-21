import { ProductsResponse, SortOption } from '@/app/types';

export const fetchProducts = async ({
    pageParam = 0,
    search = '',
    sort = 'none'
}: {
    pageParam?: number;
    search?: string;
    sort?: SortOption;
}): Promise<ProductsResponse> => {
    const limit = 20;
    const skip = pageParam * limit;

    let url = search
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');

    const data: ProductsResponse = await response.json();

    // Apply sorting
    if (sort !== 'none') {
        data.products.sort((a, b) => {
            switch (sort) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }

    return data;
};
