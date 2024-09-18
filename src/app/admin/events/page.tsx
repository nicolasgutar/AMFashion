import React from 'react';
import { getUser } from '@/app/lib/dal';
import AdminClientEvents from '@/components/AdminClientEvents';

const EventsPage = async () => {
    const user = await getUser();
    if (!user) {
        return <div>Error: User not found</div>;
    }

    if (user.email !== 'correo@correo.com') {
        return <div>Unauthorized</div>;
    }

    return <AdminClientEvents />;
};

export default EventsPage;