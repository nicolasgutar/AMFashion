import React from 'react';
import modelsData from '../data/models.json';
import productsData from '../data/products.json';

const HomePage = () => {
  const featuredModels = modelsData.slice(0, 3);
  const featuredProducts = productsData.slice(0, 3);

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Fashion Brand</h1>
        <p className="text-lg mb-6">"Welcome to our fashion brand, where we celebrate beauty, diversity, and innovation." -Andrea Mesa</p>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModels.map(model => (
                <div key={model.id} className="bg-gray-800 shadow-md rounded-lg p-4 rounded shadow">
                    <img src={model.photo} alt={model.name} className="w-full h-48 object-contain mb-4 rounded-lg"/>
                    <h3 className="text-xl font-semibold">{model.name}</h3>
                    <a href={model.portfolio} className="text-blue-500">View Portfolio</a>
                </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
                <div key={product.id} className="bg-gray-800 shadow-md rounded-lg p-4 rounded shadow">
                  <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4" />
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-800 font-bold mt-2">${product.price.toFixed(2)}</p>
                </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">About Our Brand</h2>
          <p className="text-lg">Our fashion brand is dedicated to celebrating beauty, diversity, and innovation. We believe in creating products that empower individuals to express their unique style and personality. Our values include sustainability, inclusivity, and excellence in craftsmanship.</p>
        </section>
      </div>
  );
};

export default HomePage;