// src/app/products/page.tsx
"use client";

import { useState, useEffect } from 'react';
import ProductCont from "@/components/ProductCont";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const fetchProducts = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(product => product.category))];

    useEffect(() => {
        if (selectedCategory === 'All') {
            fetchProducts();
        } else {
            setProducts(products.filter(product => product.category === selectedCategory));
        }
    }, [selectedCategory]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Available Products</h1>

            <div className="mb-6">
                <label className="font-bold mr-2">Filter by Category:</label>
                <select
                    className="border border-gray-300 p-2 rounded bg-white text-black"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCont key={product.id} product={product} userId={36} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;