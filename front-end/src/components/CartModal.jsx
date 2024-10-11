import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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


    async function checkout() {
            
        const cartItems = cart.map(cartItem =>({
            price: cartItem.default_price.id,
            quantity: 1
        }))

        try {
            // Send a POST request to the checkout API
            const res = await fetch('http://localhost:5000/api/checkout', {
                method: 'POST',
                body: JSON.stringify({ cartItems }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
    
            // Check if the response is OK
            if (!res.ok) {
            throw new Error('Network response was not ok');
            }
    
            // Parse the response JSON
            const data = await res.json();
            // Redirect to the checkout session URL
            window.location.href = data.session.url; 
            setIsOpen(false);


        } catch (error) {
            // Log any errors during the checkout process
            console.error('Error during checkout:', error);
        }

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
                <button onClick={checkout} className='checkout' type="submit">Checkout</button>
            </div>
        </div>
    );
}

export default CartModal;


