import React from 'react';
import { getUser } from '@/app/lib/dal';
import AdminClientModels from '@/components/AdminClientModels';

const ProductsPage = async () => {
    const user = await getUser();
    if (!user) {
        return <div>Error: User not found</div>;
    }

    if (user.email !== 'correo@correo.com') {
        return <div>Unauthorized</div>;
    }

    return <AdminClientModels />;
};

export default ProductsPage;