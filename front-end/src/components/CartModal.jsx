function CartModal({ isOpen, cart }) {
    if (!isOpen) return null;

    return (
        <div className="cart-modal">
            <div className="modal-content">
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <p style={{color:"grey"}}><strong>{item.name}</strong></p>  <p>${(item.default_price.unit_amount / 100).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CartModal;

