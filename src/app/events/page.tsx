"use client"; // Ensure this is marked as a Client Component

import eventsData from '../../data/events.json';

const EventsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Fashion Events</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.map((event) => (
                    <div key={event.id} className="border border-gray-300 p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">{new Date(event.date).toLocaleDateString()}</h2>
                        <p className="text-gray-600 mb-4">{event.location}</p>

                        <h3 className="text-lg font-bold">Participating Models:</h3>
                        <ul className="list-disc list-inside mb-4">
                            {event.participatingModels.map((model, index) => (
                                <li key={index}>{model}</li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-bold">Products Showcase:</h3>
                        <ul className="list-disc list-inside">
                            {event.productsShowcase.map((product, index) => (
                                <li key={index}>{product}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
