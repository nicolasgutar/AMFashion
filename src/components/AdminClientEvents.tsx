'use client';

import React, { useEffect, useState } from 'react';
import AdminEventsContainer from './AdminEventsContainer';
import EventForm from './EventForm';
import { Event } from '@/types/Event';

const AdminClientEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventCreated = () => {
        fetchEvents();
    };

    const handleDelete = (id: number) => {
        setEvents(events.filter(event => event.id !== id));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {(error as Error).message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Admin Events</h1>

            <EventForm onEventCreated={handleEventCreated} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <AdminEventsContainer key={event.id} event={event} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default AdminClientEvents;