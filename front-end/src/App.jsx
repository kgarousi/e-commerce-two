import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCards from './components/ProductCards';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import { useState, useEffect } from 'react';

function App() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const[products, setProducts] = useState([])

    function addToCart(product) {
        setCart((prevCart) => [...prevCart, product]);
    }

    const openCart = () => setIsCartOpen(!isCartOpen);
    
    const fetchProducts = async () =>{
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); // Set the fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message); // Set any errors
      } finally {
        setLoading(false); // Stop loading
      }
    }
      useEffect(() => {
        fetchProducts(); // Call the fetch function
      }, []);

    return (
        <Router>
            <div className="app-container">
                <Header onOpenCart={openCart} />
                <Routes>
                    <Route path="/" element={<ProductCards products={products}/>} />
                    <Route path="/product/:priceId" element={<ProductCard addToCart={addToCart} />} />
                </Routes>

                <CartModal 
                    isOpen={isCartOpen} 
                    cart={cart} 
                    // You can pass products if needed
                    // products={products} 
                />
            </div>
        </Router>
    );
}

export default App;

