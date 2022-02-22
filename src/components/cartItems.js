import '../App.css';

export default function CartItems({items}) {
    const {title, img, price, count, total} = items
  return (
    <div className='cartitem-container'>
        <div>
            <img src={img} alt="product" />
            <p>{title}</p>
            <p>{price}</p>
            <p>{count}</p>
            <button>remove</button>
            <p>{total}</p>


        </div>
    </div>
  );
}
