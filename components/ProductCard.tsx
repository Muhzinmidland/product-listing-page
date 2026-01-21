import React from 'react';
import { Product } from '@/app/types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 bg-gray-100">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="lazy"
            />
            {product.stock < 20 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Low Stock
                </span>
            )}
        </div>
        <div className="p-4">
            <div className="text-xs text-gray-700 uppercase mb-1">{product.category}</div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 h-14">{product.title}</h3>
            <p className="text-sm text-gray-800 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                </div>
            </div>
            {product.brand && (
                <div className="mt-2 text-xs text-gray-700">Brand: {product.brand}</div>
            )}
        </div>
    </div>
);

export default ProductCard;
