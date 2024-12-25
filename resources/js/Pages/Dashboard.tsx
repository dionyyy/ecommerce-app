import ProductList from '@/Components/ProductList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Keep Toastify's default CSS


type ProductData = {
    id: number,
    title: string,
    slug: string,
    image: string,
    description: string,
    price: string,
    published: boolean,
    updated_at: string
}

type ProductsProps = {
    products: ProductData[]
}

export default function Dashboard() {
    const { products } = usePage<PageProps<ProductsProps>>().props;

    const [cartItems, setCartItems] = useState<Array<{ id: number; quantity: number }>>([]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAddToCart = (productId: number) => {
        console.log(`Added product ${productId} to cart`);

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === productId);
            if (existingItem && prevItems.length > 0) {
                // Update quantity if the product is already in the cart
                return prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add new product to cart
                return [...prevItems, { id: productId, quantity: 1 }];
            }
        });

        toast.success('Added to cart!', {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    E-commerce Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <ToastContainer />
                <ProductList products={products} onAddToCart={handleAddToCart} />
            </div>
        </AuthenticatedLayout>
    );
}
