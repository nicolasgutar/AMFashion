'use client';

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Model } from '@/types/Model';

interface ModelContProps {
    model: Model;
    onDelete: (id: number) => void;
}

const AdminModelCont: React.FC<ModelContProps> = ({ model, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/models/${model.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                onDelete(model.id);
            } else {
                console.error('Failed to delete model');
            }
        } catch (error) {
            console.error('Error deleting model:', error);
        }
    };

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-4 relative">
            <h2 className="text-xl font-semibold">{model.name}</h2>
            <p className="text-gray-400">{model.contact}</p>
            <p className="text-gray-100 font-bold mt-2">{model.bio}</p>
            <a
                href={`/model/${model.id}`}
                className="text-blue-500 hover:underline mt-2 block"
            >
                View Portfolio
            </a>
            <FaTrash
                className="absolute bottom-2 right-2 cursor-pointer text-gray-400 hover:text-red-500 transition duration-300"
                onClick={handleDelete}
                style={{ fontSize: '2rem' }} // Increase the font size
            />
        </div>
    );
};

export default AdminModelCont;