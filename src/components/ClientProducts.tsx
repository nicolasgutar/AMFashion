"use client";

import { useState, useEffect } from 'react';
import ProductCont from "@/components/ProductCont";
import Loading from "./loading";
import { Product } from '@/types/Product';

interface User {
    id: number;
    name: string;
    email: string;
    favorites: Product[];
}

interface ProductsPageProps {
    user: User;
}

const ProductsPage: React.FC<ProductsPageProps>= ({ user }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const fetchProducts = async () => {
        const response = await fetch('/api/products');
        const data: Product[] = await response.json();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const categories = ['all', ...new Set(products.map(product => product.category))];

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Available Products</h1>
            <div className="mb-4">
                <label htmlFor="category" className="mr-2">Filter by category:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-2 border rounded bg-white text-gray-800 dark:text-gray-200 dark:bg-gray-800"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCont key={product.id} product={product} user={user} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;