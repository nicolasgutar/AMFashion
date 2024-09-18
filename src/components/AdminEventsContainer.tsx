'use client';

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Event } from '@/types/Event';

interface AdminEventsContainerProps {
    event: Event;
    onDelete: (id: number) => void;
}

const AdminEventsContainer: React.FC<AdminEventsContainerProps> = ({ event, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/events/${event.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                onDelete(event.id);
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-4 relative">
            <h2 className="text-xl font-semibold">{new Date(event.date).toLocaleDateString()}</h2>
            <p className="text-gray-400">{event.location}</p>
            <h3 className="text-lg font-bold mt-2">Participating Models:</h3>
            <ul className="list-disc list-inside mb-4">
                {event.participatingModels.map((model, index) => (
                    <li key={index}>{model}</li>
                ))}
            </ul>
            <h3 className="text-lg font-bold">Products Showcase:</h3>
            <ul className="list-disc list-inside">
                {event.productsShowcase.map((product, index) => (
                    <li key={index}>{product}</li>
                ))}
            </ul>
            <FaTrash
                className="absolute bottom-2 right-2 cursor-pointer text-gray-400 hover:text-red-500 transition duration-300"
                onClick={handleDelete}
                style={{ fontSize: '2rem' }}
            />
        </div>
    );
};

export default AdminEventsContainer;