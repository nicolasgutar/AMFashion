import { getUser } from '@/app/lib/dal';

const UserPage = async () => {
    const user = await getUser();

    if (!user) {
        return <div>Error: User not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <div className="bg-gray-800 shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">Name: {user.name}</h2>
                <p className="text-gray-600">Email: {user.email}</p>
            </div>
        </div>
    );
};

export default UserPage;