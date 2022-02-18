
export default function CartItems({items}) {
    const {title, img, price, } = items
  return (
    <div>
        <h1>Cart items listed</h1>
        <div>
            <h1>Item</h1>
            <h1>Name of item</h1>
            <h1>price</h1>
            <h1>quantity</h1>
            <h1>remove</h1>
            <h1>total</h1>
        </div>
    </div>
  )
}
