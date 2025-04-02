import { useState, useMemo, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Star, Heart, SlidersHorizontal } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

type ProductData = {
    id: number,
    title: string,
    slug: string,
    image: string,
    description: string,
    price: string,
    published: boolean,
    updated_at: string,
    category: string;
    ratings: number;
}

type ProductsProps = {
    products: ProductData[]
}

type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

export default function Dashboard() {
    const { products } = usePage<PageProps<ProductsProps>>().props;
    const [cartItems, setCartItems] = useState<Array<{ id: number; title: string; quantity: number; price: string }>>(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const categories = [...new Set(products.map(product => product.category))];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('rating-desc');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (product: ProductData) => {
        console.log(`Added product ${product.id} to cart`);

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem && prevItems.length > 0) {
                // Update quantity if the product is already in the cart
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1, price: (parseFloat(item.price) + parseFloat(product.price)).toString() } : item
                );
            } else {
                // Add new product to cart
                return [...prevItems, { id: product.id, title: product.title, quantity: 1, price: product.price }];
            }
        });

        toast.success('Added to cart!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        // Apply category filter
        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Apply price range filter
        filtered = filtered.filter(
            product => parseFloat(product.price) >= priceRange[0] && parseFloat(product.price) <= priceRange[1]
        );

        // Apply sorting
        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return parseFloat(a.price) - parseFloat(b.price);
                case 'price-desc':
                    return parseFloat(b.price) - parseFloat(a.price);
                case 'rating-desc':
                    return b.ratings - a.ratings;
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
    }, [selectedCategory, sortBy, priceRange,]);

    return (
        <AuthenticatedLayout>
            <ToastContainer />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <SlidersHorizontal className="h-5 w-5 mr-2" />
                        Filters
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="sticky top-24 space-y-6">
                            {/* Categories */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`block w-full text-left px-3 py-2 rounded-md ${selectedCategory === null
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`block w-full text-left px-3 py-2 rounded-md ${selectedCategory === category
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="30000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sort By */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Sort By</h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="rating-desc">Highest Rated</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredAndSortedProducts.map((product) => (
                                <div key={product.id} className="group">
                                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Heart className="h-5 w-5 text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                                        <div className="flex items-center mt-1">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < Math.floor(product.ratings)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                            }`}
                                                        fill="currentColor"
                                                    />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-sm text-gray-500">{product.ratings}</span>
                                        </div>
                                        <p className="mt-1 text-lg font-semibold text-gray-900">${product.price}</p>
                                        <button
                                            className="mt-4 w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
