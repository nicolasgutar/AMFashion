'use client'

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
}

interface ProductContProps {
    product: Product;
    user: User | null;
}

interface User {
    id: number;
    name: string;
    email: string;
    favorites: Product[];
}

const ProductCont: React.FC<ProductContProps> = ({ product, user }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/products/${product.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Optionally, you can refresh the page or update the state to remove the deleted product from the UI
                router.refresh();
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-4 relative">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-400">{product.description}</p>
            <p className="text-gray-100 font-bold mt-2">${product.price.toFixed(2)}</p>
            <FaTrash
                className="absolute bottom-2 right-2 cursor-pointer text-gray-400 hover:text-red-500 transition duration-300"
                onClick={handleDelete}
                style={{ fontSize: '2rem' }} // Increase the font size
            />
        </div>
    );
};

export default ProductCont;