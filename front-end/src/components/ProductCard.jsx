import { useLocation } from "react-router-dom"

export default function ProductCard() {
    const location = useLocation();
    const { product } = location.state || {};

    return (
    <div className="product-card">
        <img className="product-card--image" src={product.images}/>
        <div className="product--info">
            <p style={{fontWeight: 'bold'}}>{product.name}</p>
            <p>${product.default_price.unit_amount / 100}</p>
        </div>
            <p className="product-description">{product.description}</p>
        <div className="add-to-cart-div">
            <button className="add-to-cart" type="button">Add to Cart</button>
        </div>
    </div>
  )
}
