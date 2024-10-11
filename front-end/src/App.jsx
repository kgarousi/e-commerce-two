import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCards from './components/ProductCards';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import { useState, useEffect } from 'react';
import Cancel from './components/Cancel';
import Success from './components/Success';

function App() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Header onOpenCart={() => setIsCartOpen(!isCartOpen)} cart={cart} />
                <Routes>
                    <Route path="/" element={<ProductCards products={products} />} />
                    <Route path="/product/:priceId" element={<ProductCard addToCart={(product) => setCart((prev) => [...prev, product])} />} />
                    <Route path='/cancel' element={<Cancel />} />
                    <Route path='/success' element={<Success/>} />
                </Routes>
                <CartModal 
                    isOpen={isCartOpen} 
                    cart={cart} 
                    setIsOpen={setIsCartOpen}
                    setCart={setCart}
                />
            </div>
        </Router>
    );
}

export default App;



