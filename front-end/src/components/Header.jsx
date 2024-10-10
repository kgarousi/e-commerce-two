

export default function Header({onOpenCart}) {
  return (
    <header>
      <h1><a href="/">SHOP</a></h1>
        <button onClick={onOpenCart} className="cart" type="button"><i className="fa-solid fa-cart-shopping fa-lg"></i></button>
    </header>
  )
}
