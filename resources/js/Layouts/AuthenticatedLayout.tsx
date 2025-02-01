import React from 'react';
import { ShoppingCart, Heart, Search, Menu, LogOut } from 'lucide-react';
import { Link, usePage, router } from '@inertiajs/react';

type LayoutProps = {
    children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: LayoutProps) {
    const user = usePage().props.auth.user;
    return (
        <div className="min-h-screen bg-white">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Menu className="h-6 w-6 mr-4 lg:hidden" />
                            <Link href={user ? "/dashboard" : "/"} className="text-2xl font-bold text-gray-900">TechStore</Link>
                        </div>
                        <div className="hidden lg:flex items-center space-x-8">
                            {/* <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                            <Link href="/shop" className="text-gray-700 hover:text-gray-900">Shop</Link>
                            <Link href="/categories" className="text-gray-700 hover:text-gray-900">Categories</Link>
                            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link> */}
                        </div>
                        <div className="flex items-center space-x-4">
                            <Search className="h-6 w-6 text-gray-600 cursor-pointer" />
                            <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
                            <ShoppingCart onClick={() => router.visit("/cart")} className="h-6 w-6 text-gray-600 cursor-pointer" />
                            <button
                                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                                onClick={() => {
                                    router.post(route('logout'));
                                }}
                            >
                                <LogOut className="h-6 w-6" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
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
                                <li><Link href="/" className="text-gray-400 hover:text-white">Shop</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">Categories</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">About</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-400 hover:text-white">FAQ</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">Shipping</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">Returns</Link></li>
                                <li><Link href="/" className="text-gray-400 hover:text-white">Track Order</Link></li>
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
    );
}
