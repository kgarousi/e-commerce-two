import React from 'react';

function CartModal({ isOpen, setIsOpen, cart, setCart }) {
    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        // Check if the clicked element is the overlay
        if (event.target.classList.contains('cart-modal')) {
            setIsOpen(false)
        }
    };

    function handleRemoveFromCart(index){
            setCart(prevCart => {
                const newCart = prevCart.filter((_, i) => i !== index);
                return newCart;
            })
    }

    return (
        <div className="cart-modal" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className='modal--items'>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <div className='cart--item'>        
                                    <div className='price--trash'>
                                        <p style={{color:"grey"}}><strong>{item.name}</strong></p> 
                                        <i id="trash" onClick={() => handleRemoveFromCart(index)} className="fa-solid fa-trash"></i>
                                    </div>
                                    <div>
                                        <p>${(item.default_price.unit_amount / 100).toFixed(2)}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                )}
                <button className='checkout' type="submit">Checkout</button>
            </div>
        </div>
    );
}

export default CartModal;


