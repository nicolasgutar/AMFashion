// src/components/EventForm.tsx
'use client';

import React, { useState } from 'react';

interface EventFormProps {
    onEventCreated: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onEventCreated }) => {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [participatingModels, setParticipatingModels] = useState('');
    const [productsShowcase, setProductsShowcase] = useState('');
    const [error, setError] = useState<unknown>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    location,
                    participatingModels: participatingModels.split(',').map(model => model.trim()),
                    productsShowcase: productsShowcase.split(',').map(product => product.trim()),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            onEventCreated();
            setDate('');
            setLocation('');
            setParticipatingModels('');
            setProductsShowcase('');
        } catch (error) {
            setError(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold mb-2 text-white">Create New Event</h2>
            <div className="mb-2">
                <label className="block text-gray-300 mb-1">Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-300 mb-1">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-300 mb-1">Participating Models (comma separated)</label>
                <input
                    type="text"
                    value={participatingModels}
                    onChange={(e) => setParticipatingModels(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-300 mb-1">Products Showcase (comma separated)</label>
                <input
                    type="text"
                    value={productsShowcase}
                    onChange={(e) => setProductsShowcase(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                    required
                />
            </div>
            {error && <div className="text-red-500 mb-2">Error: {(error as Error).message}</div>}
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold">Create Event</button>
        </form>
    );
};

export default EventForm;