import Link from 'next/link';
import {getUser} from "@/app/lib/dal";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    <Link href="/">AM's Fashion Agency</Link>
                </div>
                <div className="space-x-4">
                    <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link href="/models" className="text-gray-300 hover:text-white">Models</Link>
                    <Link href="/products" className="text-gray-300 hover:text-white">Products</Link>
                    <Link href="/images" className="text-gray-300 hover:text-white">Media</Link>
                    <Link href="/events" className="text-gray-300 hover:text-white">Events</Link>
                    <Link href={`/members`} className="text-gray-300 hover:text-white">Members</Link>
                    <Link href="/user" className="text-gray-300 hover:text-white">Profile</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
