"use client";

import { useState, useEffect } from 'react';
import AdminModelCont from "@/components/AdminModelCont";
import Loading from "./loading";
import { Model } from '@/types/Model';

const ModelsPage = () => {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState(true);
    const [newModel, setNewModel] = useState<Model>({
        id: 0,
        name: '',
        contact: '',
        bio: ''
    });
    const [newImage, setNewImage] = useState({
        url: '',
        description: '',
        modelId: 0
    });

    const fetchModels = async () => {
        const response = await fetch('/api/models');
        const data: Model[] = await response.json();
        setModels(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchModels();
    }, []);

    const handleModelInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewModel({ ...newModel, [name]: value });
    };

    const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewImage({ ...newImage, [name]: value });
    };

    const handleAddModel = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/models', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newModel),
            });
            if (response.ok) {
                const addedModel = await response.json();
                setModels([...models, addedModel]);
                // Reset form
                setNewModel({
                    id: 0,
                    name: '',
                    contact: '',
                    bio: ''
                });
            } else {
                console.error('Failed to add model');
            }
        } catch (error) {
            console.error('Error adding model:', error);
        }
    };

    const handleAddImage = async (event: React.FormEvent) => {
        console.log("got into add image");
        event.preventDefault();
        try {
            const response = await fetch('/api/imgs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newImage),
            });
            if (response.ok) {
                // Reset form
                setNewImage({
                    url: '',
                    description: '',
                    modelId: 0
                });
            } else {
                console.error('Failed to add image');
            }
        } catch (error) {
            console.error('Error adding image:', error);
        }
    };

    const handleDeleteModel = (id: number) => {
        setModels(models.filter(model => model.id !== id));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Available Models</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                    <AdminModelCont key={model.id} model={model} onDelete={handleDeleteModel} />
                ))}
            </div>
            <div className="flex flex-col md:flex-row mt-8 gap-4">
                <form onSubmit={handleAddModel} className="p-4 border rounded bg-gray-800 flex-1">
                    <h2 className="text-2xl font-bold mb-4">Add New Model</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-200">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newModel.name}
                            onChange={handleModelInputChange}
                            className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-gray-200">Contact</label>
                        <textarea
                            id="contact"
                            name="contact"
                            value={newModel.contact}
                            onChange={handleModelInputChange}
                            className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-gray-200">Bio</label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            value={newModel.bio}
                            onChange={handleModelInputChange}
                            className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                        Add Model
                    </button>
                </form>
                <form onSubmit={handleAddImage} className="p-4 border rounded bg-gray-800 flex-1">
                    <h2 className="text-2xl font-bold mb-4">Add New Image</h2>
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-gray-200">Image URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={newImage.url}
                            onChange={handleImageInputChange}
                            className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-200">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newImage.description}
                            onChange={handleImageInputChange}
                            className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="modelId" className="block text-gray-200">Model ID</label>
                        <input
                            type="number"
                            id="modelId"
                            name="modelId"
                            value={newImage.modelId}
                            onChange={handleImageInputChange}
                            className="w-full p-2 border rounded bg-gray-700 text-gray-200"
                            required
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                        Add Image
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModelsPage;