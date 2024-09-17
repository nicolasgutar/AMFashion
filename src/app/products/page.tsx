import React from 'react'
import {getUser} from "@/app/lib/dal";
import ClientProducts from "@/components/ClientProducts";

const productsPage = async () => {
    const user = await getUser();
    if (!user) {
        return <div>Error: User not found</div>;
    }

    return (
        <ClientProducts user={user}/>
    )
}

export default productsPage;