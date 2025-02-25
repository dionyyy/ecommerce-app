import { Head, router, usePage } from '@inertiajs/react';
import ProductList from '@/Components/ProductList';
import { ShoppingCart, Heart, Search, ArrowRight, Star, Menu } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { PageProps } from '@/types';

type ProductData = {
    id: number;
    title: string;
    slug: string;
    image: string;
    description: string;
    price: string;
    published: boolean;
    updated_at: string;
    category: string;
    rating: number;
};

type ProductsProps = {
    products: ProductData[]
}

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
}

const featuredProducts: Product[] = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        rating: 4.8
    },
    {
        id: 2,
        name: "Smart Watch Series X",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        rating: 4.9
    },
    {
        id: 3,
        name: "Professional Camera Kit",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
        rating: 4.7
    },
    {
        id: 4,
        name: "Designer Sunglasses",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
        rating: 4.6
    }
];

export default function Welcome() {
    const handleAddToCart = (productId: number) => {
        const { products } = usePage<PageProps<ProductsProps>>().props;
        // Retrieve current cart from local storage
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Successfully added to cart");
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <Menu className="h-6 w-6 mr-4 lg:hidden" />
                                <span className="text-2xl font-bold text-gray-900">TechStore</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Search className="h-6 w-6 text-gray-600" />
                                <Heart className="h-6 w-6 text-gray-600" />
                                <ShoppingCart className="h-6 w-6 text-gray-600" />
                                <a href="/login" className="text-gray-700 hover:text-gray-900">Sign in</a>
                                <a href="#" className="text-gray-700 hover:text-gray-900">Sign up</a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative bg-gray-900 h-[600px]">
                    <img
                        src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1920&q=80"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                        alt="Hero background"
                    />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                        <div className="max-w-xl">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Next-Gen Tech
                                <span className="block">For Modern Life</span>
                            </h1>
                            <p className="mt-4 text-xl text-gray-300">
                                Discover the latest in technology and gadgets. Premium quality, unbeatable prices.
                            </p>
                            <button onClick={() => router.visit("/login")} className="mt-8 flex items-center bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                                Shop Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Products */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="group">
                                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Heart className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                    <div className="flex items-center mt-1">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < Math.floor(product.rating)
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                    fill="currentColor"
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500">{product.rating}</span>
                                    </div>
                                    <p className="mt-1 text-lg font-semibold text-gray-900">${product.price}</p>
                                    <button onClick={() => handleAddToCart(product.id)} className="mt-4 w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                                    <p className="text-gray-600">On orders over $100</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                                    <p className="text-gray-600">Get help when you need it</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold mb-2">Money Back</h3>
                                    <p className="text-gray-600">30-day guarantee</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold mb-4">About Us</h4>
                                <p className="text-gray-400">Your trusted source for the latest tech and gadgets.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Shipping</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white">Track Order</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                                <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
                                <div className="flex">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-2 rounded-l-md text-gray-900"
                                    />
                                    <button className="bg-white text-gray-900 px-4 py-2 rounded-r-md hover:bg-gray-100">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 TechStore. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
