import { getImages } from '@/app/lib/getImages';
import ImageComponent from '@/components/ImageComponent';

const ImagesPage = async () => {
    const images = getImages('public');

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Image Gallery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <ImageComponent key={index} src={`/${image}`} />
                ))}
            </div>
        </div>
    );
};

export default ImagesPage;