'use client';

import React, { useState } from 'react';

interface ImageComponentProps {
    src: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img src={src} alt="Image"
                 className={`w-full h-auto object-contain ${hover ? 'opacity-50' : 'opacity-100'}`}/> {hover && (
            <a
                href={src}
                download
                className="absolute bottom-2 right-2 bg-white text-black p-2 rounded"
                >
                    Download
                </a>
            )}
        </div>
    );
};

export default ImageComponent;