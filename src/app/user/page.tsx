import { getUser } from '@/app/lib/dal';

const UserPage = async () => {
    const user = await getUser();

    if (!user) {
        return <div>Error: User not found</div>;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = new URL(`/api/user/${user.id}/favorites`, baseUrl);
    const favoritesResponse = await fetch(url.toString());
    const favorites = await favoritesResponse.json();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <div className="bg-gray-800 shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">Name: {user.name}</h2>
                <p className="text-gray-600">Email: {user.email}</p>
            </div>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-2">Favorite Products</h2>
                {favorites.length > 0 ? (
                    <ul>
                        {favorites.map((product: any) => (
                            <li key={product.id} className="bg-gray-700 p-2 rounded mb-2">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-500">{product.description}</p>
                                <p className="text-gray-400">${product.price}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No favorite products found.</p>
                )}
            </div>
        </div>
    );
};

export default UserPage;