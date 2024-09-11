"use client"

import React, { useEffect, useState } from 'react';

interface ModelData {
    id: number;
    name: string;
    portfolio: string;
    bookingInfo: string;
}

const Page = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/images')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setImages(data))
            .catch(error => console.error('Error fetching images:', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Alice's Portfolio</h1>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {images.map((src, index) => (
                    <div key={index} className="flex-1">
                        <img
                            src={`/models/alice/${src}`}
                            alt={`alice ${index + 1}`}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                ))}
            </div>
            <p className="mt-4">For booking contact alice@agency.com</p>
        </div>
    );
};

export default Page;
