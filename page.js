"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);

  const banners = [
    {
      src: "/banner1.jpg",
      text: "Super Sale – 50% Off Fruits",
    },
    {
      src: "/banner2.jpg",
      text: "Buy 1 Get 1 Free on Dairy",
    },
    {
      src: "/banner3.jpg",
      text: "Bakery Special Today Only",
    },
  ];

  const products = [
    { name: "Fresh Tomato", price: 30, category: "Vegetables", img: "/tomato11.jpg", tag: "10% OFF" },
    { name: "Farm Fresh Potato", price: 40, category: "Vegetables", img: "potato.jpg", tag: "NEW" },
    { name: "Mango", price: 50, category: "Fruits", img: "mango.jpg", tag: "Deal of the Day" },
    { name: "Farm Fresh Apple", price: 80, category: "Fruits", img: "apple.jpg" },
    { name: "Farm Fresh Milk", price: 25, category: "Dairy", img: "milk.jpg" },
    { name: "Farm Fresh Paneer", price: 200, category: "Dairy", img: "paneer.jpg", tag: "Only Today!" },
    { name: "Farm Fresh Ice Cream", price: 25, category: "Frozen", img: "icecream.jpg" },
    { name: "Farm Fresh Ghee", price: 25, category: "Dairy", img: "ghee.jpg", tag: "Limited Stock!" },
    { name: "Peas & Sweet Corn", price: 70, category: "Frozen", img: "peas.jpg" },
    { name: "Hot Samosas", price: 25, category: "Bakery", img: "samosa.jpg", tag: "Hot Deal" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-sans bg-gray-50">
      <header className="bg-green-600 text-white flex items-center justify-between p-4 shadow-md">
        <h1 className="text-xl font-extrabold flex items-center space-x-2">
          <span>🌿</span>
          <span>B2C mart</span>
        </h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-1 rounded text-black border"
          />
          <button className="bg-white text-green-600 px-3 py-1 rounded shadow">
            Cart ({cart.length})
          </button>
        </div>
      </header>

      <section className="relative w-full h-64 rounded-xl overflow-hidden shadow-md mt-4 mx-2">
        <img
          src={banners[bannerIndex].src}
          alt="Banner"
          className="w-full h-full object-cover rounded fade opacity-100"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-xl font-semibold text-center px-4">
          {banners[bannerIndex].text}
        </div>
      </section>

      <nav className="flex overflow-x-auto space-x-2 p-2 bg-white shadow mt-4 mx-2 rounded">
        {["All", "Vegetables", "Fruits", "Dairy", "Bakery", "Frozen"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-2 bg-green-100 rounded hover:bg-green-200 text-sm shadow whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </nav>

      <section className="p-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-4">⭐ Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded shadow hover:scale-105 transition text-center relative"
            >
              {product.tag && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded shadow">
                  {product.tag}
                </span>
              )}
              <img
                src={product.img}
                className="mx-auto mb-2 rounded max-h-24 object-contain"
                alt={product.name}
              />
              <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
              <p className="text-green-700 font-bold text-sm">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2  bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
