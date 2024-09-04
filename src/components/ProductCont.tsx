// src/app/components/ProductCont.tsx
import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
}

const ProductCont: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-4 rounded shadow">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-100 font-bold mt-2">${product.price.toFixed(2)}</p>
        </div>
    );
};

export default ProductCont;