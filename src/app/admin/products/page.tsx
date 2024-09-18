import React from 'react'
import {getUser} from "@/app/lib/dal";
import AdminClientProducts from "@/components/AdminClientProducts";

const productsPage = async () => {
    const user = await getUser();
    if (!user) {
        return <div>Error: User not found</div>;
    }

    if (user.email !== 'correo@correo.com') {
        return <div>Unauthorized</div>;
    }

    return (
        <AdminClientProducts user={user}/>
    )
}

export default productsPage;