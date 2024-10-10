import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCards from './components/ProductCards'
import Header from './components/Header'; // Optional: If you have a header component
import ProductCard from './components/ProductCard';


function App() {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <Routes>
                    <Route path="/" element={<ProductCards />} />
                    <Route path="/product/:priceId" element={<ProductCard />} />
                    {/* Add more routes here as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

