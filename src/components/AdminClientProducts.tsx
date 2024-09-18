"use client";

import { useState, useEffect } from 'react';
import AdminProductCont from "@/components/AdminProductCont";
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
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        images: [],
        category: ''
    });

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async (event: React.FormEvent) => {
        event.preventDefault();
        // Add product to the database (placeholder)
        console.log('Adding product:', newProduct);
        // Reset form
        setNewProduct({
            id: 0,
            name: '',
            description: '',
            price: 0,
            images: [],
            category: ''
        });
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
                    <AdminProductCont key={product.id} product={product} user={user} />
                ))}
            </div>
            <form onSubmit={handleAddProduct} className="mt-10 mx-30 p-4 border rounded bg-gray-800">
                <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-200">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-200">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-200">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="images" className="block text-gray-200">Images (comma separated URLs)</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        value={newProduct.images.join(', ')}
                        onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value.split(',').map(img => img.trim()) })}
                        className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-200">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductsPage;