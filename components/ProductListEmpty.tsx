import { AlertCircle } from 'lucide-react';
import React from 'react';

const ProductListEmpty: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <AlertCircle className="w-16 h-16 mb-4" />
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm mt-2">Try adjusting your search terms</p>
        </div>
    );
};

export default ProductListEmpty;
