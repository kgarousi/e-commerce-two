import { useLocation } from "react-router-dom";

export default function ProductCard({ addToCart }) {
    const location = useLocation();
    const { product } = location.state || {};

    const handleAddToCart = () => {
        if (product) {
            addToCart(product); // Pass the product to the addToCart function
            console.log(`${product.name} has been added to the cart.`);
        }
    };

    return (
        <div className="product-card">
            <img className="product-card--image" src={product.images} alt={product.name} />
            <div className="product--info">
                <p style={{ fontWeight: 'bold' }}>{product.name}</p>
                <p>${(product.default_price.unit_amount / 100).toFixed(2)}</p>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="add-to-cart-div">
                <button onClick={handleAddToCart} className="add-to-cart" type="button">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
