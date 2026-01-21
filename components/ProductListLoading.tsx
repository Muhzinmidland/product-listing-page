import { Loader2 } from 'lucide-react';
import React from 'react';

const ProductListLoading: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        </div>
    );
};

export default ProductListLoading;
