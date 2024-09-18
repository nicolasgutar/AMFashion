'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const AdminPage: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 border-2 border-gray-700 rounded-lg">
            <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
            <div className="space-x-4">
                <button
                    onClick={() => handleNavigation('/admin/products')}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                >
                    Products
                </button>
                <button
                    onClick={() => handleNavigation('/admin/models')}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                >
                    Models
                </button>
                <button
                    onClick={() => handleNavigation('/admin/events')}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                >
                    Events
                </button>
            </div>
        </div>
    );
};

export default AdminPage;