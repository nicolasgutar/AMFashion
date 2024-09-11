import { getImages } from '@/app/lib/getImages';
import ImageComponent from '@/components/ImageComponent';

const ImagesPage = async () => {
    const images = getImages('public');

    // Function to calculate aspect ratio
    const calculateAspectRatio = (width: number, height: number) => width / height;

    // Mock function to get image dimensions (replace with actual implementation)
    const getImageDimensions = (src: string) => {
        // This should return the actual width and height of the image
        return { width: 100, height: 100 }; // Example dimensions
    };

    // Group images by aspect ratio
    const groupedImages: { [key: string]: string[] } = {};
    images.forEach((image) => {
        const { width, height } = getImageDimensions(image);
        const aspectRatio = calculateAspectRatio(width, height).toFixed(2);
        if (!groupedImages[aspectRatio]) {
            groupedImages[aspectRatio] = [];
        }
        groupedImages[aspectRatio].push(image);
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Image Gallery</h1>
            {Object.keys(groupedImages).map((aspectRatio) => (
                <div key={aspectRatio} className="flex flex-wrap mb-4">
                    {groupedImages[aspectRatio].map((image, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                            <ImageComponent src={`/${image}`} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ImagesPage;