'use client'

import { useState, FormEvent } from 'react'

interface Errors {
    name?: string;
    email?: string;
    password?: string[];
}

export function SignupForm() {
    const [errors, setErrors] = useState<Errors | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const res = await fetch('/api/signup', {
            method: 'POST',
            body: formData,
        });

        console.log("Exited post");

        const result = await res.json();

        if (res.ok) {
            // Redirect to the homepage
            window.location.href = '/';
        } else {
            // Handle errors
            setErrors(result.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-800 shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input id="name" name="name" placeholder="Name" className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-gray-300" />
                {errors?.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input id="email" name="email" placeholder="Email" className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-gray-300" />
                {errors?.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input id="password" name="password" type="password" placeholder={"Password"} className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-gray-300" />
                {errors?.password && (
                    <div className="mt-2 text-sm text-red-600">
                        <p>Password must:</p>
                        <ul className="list-disc pl-5">
                            {errors.password.map((error, index) => (
                                <li key={index}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const pending = false; // Placeholder for pending state

    return (
        <button disabled={pending} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign Up
        </button>
    )
}