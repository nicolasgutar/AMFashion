"use client"; // Ensure this is marked as a Client Component

import Image from 'next/image';
import modelsData from '../../data/models.json';

const ModelsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Models</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modelsData.map((model) => (
                    <div key={model.id} className="bg-gray-800 shadow-md rounded-lg p-4">
                        <Image
                            src={model.photo}
                            alt={model.name}
                            width={500}
                            height={500}
                            className="w-full h-48 object-contain mb-4 rounded-lg"
                        />
                        <h2 className="text-xl font-semibold">{model.name}</h2>
                        <p className="text-blue-600 mb-2">
                            <a href={"/model"} target="_blank" rel="noopener noreferrer">
                                View Portfolio
                            </a>
                        </p>
                        <p className="text-gray-800">{model.bookingInfo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModelsPage;