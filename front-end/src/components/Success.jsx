import React from 'react'

export default function Success() {

  localStorage.removeItem('cart');
  
  return (
    <div>
      <h2 className='success'>Order complete! Press SHOP to keep browsing</h2>
    </div>
  )
}
