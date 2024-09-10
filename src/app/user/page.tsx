import { getUser } from '@/app/lib/dal';
import UserProfile from '@/components/userProfile';

const UserPage = async () => {
    const user = await getUser();

    if (!user) {
        return <div>Error: User not found</div>;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = new URL(`/api/user/${user.id}/favorites`, baseUrl);
    const favoritesResponse = await fetch(url.toString());
    const favorites = await favoritesResponse.json();

    return <UserProfile user={user} favorites={favorites} />;
};

export default UserPage;