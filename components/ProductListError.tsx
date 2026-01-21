import { AlertCircle } from 'lucide-react';
import React from 'react';

interface ProductListErrorProps {
    message: string;
}

const ProductListError: React.FC<ProductListErrorProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-red-600">
            <AlertCircle className="w-16 h-16 mb-4" />
            <p className="text-lg font-semibold">Error loading products</p>
            <p className="text-sm text-gray-600 mt-2">{message}</p>
        </div>
    );
};

export default ProductListError;
