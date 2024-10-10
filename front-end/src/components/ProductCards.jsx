import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProductCards() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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

      const navigate = useNavigate();

      function handleClick(product) {
        navigate(`/product/${product.id}`, {state: {product}} ); // Navigate to product page with priceId
    }
      const productCard = products.map(product => (
        <div className="product--image" key={product.id}
             onClick={() => handleClick(product)}   
        >
            <img src={product.images} alt={product.name} />
            <div className="name--price">
            <p><strong>{product.name}</strong></p><p><strong>${product.default_price.unit_amount /100}</strong></p>
            </div>
            <p>{product.description}</p>
        </div>
      ));
  
    return (
      <>
      <div className='products'>
        {productCard}
      </div>
      </>
    )
}
