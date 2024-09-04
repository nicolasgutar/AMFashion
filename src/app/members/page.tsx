'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MembersPage = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                router.push('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

    const membershipTiers = [
        {
            name: 'Basic',
            benefits: [
                'Access to basic content',
                'Monthly newsletter',
                'Community support'
            ]
        },
        {
            name: 'Registered',
            benefits: [
                'All Basic benefits',
                'Exclusive content',
                'Priority support',
                'Monthly webinars'
            ]
        },
        {
            name: 'Premium',
            benefits: [
                '2 free photos per month',
                'Birthday gift',
                'Early access to events',
                'VIP support'
            ]
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Membership Tiers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {membershipTiers.map((tier, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">{tier.name}</h2>
                        <ul className="list-disc pl-5 mb-4">
                            {tier.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-gray-600">{benefit}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center space-x-4">
                <Link href="/login" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-400">Login</Link>
                <Link href="/signup" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-400">Sign Up</Link>
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400">Logout</button>
            </div>
        </div>
    );
};

export default MembersPage;