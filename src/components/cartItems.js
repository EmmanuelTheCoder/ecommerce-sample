import '../App.css';

export default function CartItems({items}) {
    const {title, img, price, } = items
  return (
    <div>
        <div className="cart-item">
            <div>
                <h1>Item</h1>

            </div>

            <div>

                <h1>Name of item</h1>
            </div>
            <div>
            <h1>price</h1>

            </div>
            <div>

                <h1>quantity</h1>
            </div>
            <div>

                <h1>remove</h1>
            </div>
            <div>
                <h1>total</h1>

            </div>
        </div>
    </div>
  )
}
