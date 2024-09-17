import { getUser } from '@/app/lib/dal';
import UserProfile from '@/components/userProfile';

const UserPage = async () => {
    const user = await getUser();

    if (!user) {
        return <div>Error: User not found</div>;
    }

    const favorites = user.favorites

    return <UserProfile user={user} favorites={favorites} />;
};

export default UserPage;