import { useNavigate } from 'react-router-dom';

export default function ProductCards({products}) {
      

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
