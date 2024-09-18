'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const UserProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const Id = parseInt(id as string, 10); // Cast the id to an integer

                    if (isNaN(Id)) {
                        throw new Error('Invalid user ID');
                    }

                    const response = await fetch(`/api/user/${Id}`, {
                        method: 'GET',
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const data = await response.json();
                    setUser(data);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        setError(error.message);
                    } else {
                        setError('An unknown error occurred');
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            {user && (
                <div className="bg-gray-800 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Name: {user.name}</h2>
                    <p className="text-gray-600">Email: {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;