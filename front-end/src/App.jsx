import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCards from './components/ProductCards';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import { useState, useEffect } from 'react';

function App() {
    const [cart, setCart] = useState(() => {
        // Load cart from local storage on initial render
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const newCart = [...prevCart, product];
            localStorage.setItem('cart', JSON.stringify(newCart)); // Save to local storage
            return newCart;
        });
    };

    const openCart = () => setIsCartOpen(!isCartOpen);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data); // Set the fetched products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Call the fetch function
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Header onOpenCart={openCart} cart={cart} />
                <Routes>
                    <Route path="/" element={<ProductCards products={products} />} />
                    <Route path="/product/:priceId" element={<ProductCard addToCart={addToCart} />} />
                </Routes>

                <CartModal 
                    isOpen={isCartOpen} 
                    cart={cart} 
                />
            </div>
        </Router>
    );
}

export default App;


