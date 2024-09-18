import Image from 'next/image';
import { Model } from '@/types/Model';

interface ModelContainerProps {
    model: Model;
}

const ModelContainer: React.FC<ModelContainerProps> = ({ model }) => {
    return (
        <div key={model.id} className="bg-gray-800 shadow-md rounded-lg p-4">
            <Image
                src={model.profilePic}
                alt={model.name}
                width={500}
                height={500}
                className="w-full h-48 object-contain mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold">{model.name}</h2>
            <p className="text-blue-600 mb-2">
                <a href={`/model/${model.id}`} target="_blank" rel="noopener noreferrer">
                    View Portfolio
                </a>
            </p>
            <p className="text-gray-800">{model.contact}</p>
        </div>
    );
};

export default ModelContainer;