import '../App.css';

export default function CartItems({items}) {
    const {title, img, price, count, total} = items
  return (
    <div className='cartitem-container'>
        <div className='cart-item-products'>
            <img src={img} alt="product" />
            <p>{title}</p>
            <p>{price}</p>
            <p>{count}</p>
            <button>remove</button>
            <p><strong style={{textTransform: 'capitalize'}}>item total: </strong>{total}</p>


        </div>
    </div>
  );
}
