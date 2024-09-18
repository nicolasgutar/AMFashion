'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Model } from '@/types/Model';
import { Image } from '@/types/Image';
import Loading from '@/components/loading';

const ModelPage = () => {
    const { id } = useParams();
    const [model, setModel] = useState<Model | null>(null);
    const [images, setImages] = useState<Image[]>([]);
    const [loadingModel, setLoadingModel] = useState(true);
    const [loadingImages, setLoadingImages] = useState(true);
    const [modelError, setModelError] = useState<string | null>(null);
    const [imagesError, setImagesError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchModel = async () => {
                try {
                    const response = await fetch(`/api/models/${id}`);
                    if (response.ok) {
                        const data: Model = await response.json();
                        setModel(data);
                    } else {
                        setModelError('Failed to fetch model');
                    }
                } catch (error) {
                    setModelError('Error fetching model');
                } finally {
                    setLoadingModel(false);
                }
            };

            const fetchImages = async () => {
                try {
                    const response = await fetch(`/api/imgs/${id}`);
                    if (response.ok) {
                        const data: Image[] = await response.json();
                        setImages(data);
                    } else {
                        setImagesError('Failed to fetch images');
                    }
                } catch (error) {
                    setImagesError('Error fetching images');
                } finally {
                    setLoadingImages(false);
                }
            };

            fetchModel();
            fetchImages();
        }
    }, [id]);

    if (loadingModel || loadingImages) {
        return <Loading />;
    }

    if (modelError) {
        return <div>{modelError}</div>;
    }

    if (imagesError) {
        return <div>{imagesError}</div>;
    }

    if (!model) {
        return <div>Model not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{model.name}</h1>
            <p className="text-gray-400">{model.contact}</p>
            <p className="text-gray-100 font-bold mt-2">{model.bio}</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                    <div key={image.id} className="rounded p-4">
                        <img src={image.url} alt={image.description} className="w-full h-auto" />
                        <p className="mt-2 text-gray-700">{image.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModelPage;