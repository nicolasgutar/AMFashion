// src/components/ProductCont.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
}

interface ProductContProps {
    product: Product;
    userId: number;
}

const ProductCont: React.FC<ProductContProps> = ({ product, userId }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await fetch(`/api/user/${userId}/favorites`);
            const favorites = await response.json();
            const isFavorited = favorites.some((fav: { id: number }) => fav.id === product.id);
            setIsFavorite(isFavorited);
        };
        fetchFavorites();
    }, [product.id, userId]);

    const toggleFavorite = async () => {
        const url = `/api/user/${userId}/favorites/${product.id}`;

        if (isFavorite) {
            try {
                const response = await fetch(url, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Failed to remove favorite');
                }
                setIsFavorite(false);
            } catch (error) {
                console.error('Error removing favorite:', error);
            }
        } else {
            try {
                const response = await fetch(url, { method: 'POST' });
                if (!response.ok) {
                    throw new Error('Failed to add favorite');
                }
                setIsFavorite(true);
            } catch (error) {
                console.error('Error adding favorite:', error);
            }
        }
    };

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-4 relative">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-400">{product.description}</p>
            <p className="text-gray-100 font-bold mt-2">${product.price.toFixed(2)}</p>
            <FaStar
                className={`absolute bottom-2 right-2 cursor-pointer ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={toggleFavorite}
                style={{ fontSize: '2rem' }} // Increase the font size
            />
        </div>
    );
};

export default ProductCont;