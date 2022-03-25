import { useContext } from 'react';
import {ProductContext} from '../context'
import '../App.css';

export default function CartItems({items}) {

  const quantity = useContext(ProductContext)
  const {sumTotal, cart} = quantity

  const CartTotal = () =>{
    if(typeof sumTotal !== undefined && sumTotal !== 0){
      return <p className="cart-total-amount">${sumTotal}</p>

    }else{
      return null
    }
  }

  const CartTotalOrEmpty = () =>{
    if(cart.length === 0){
      return <h3 style={{textAlign: 'center', fontStyle: 'italic'}}>Cart is currently empty</h3>
    }else{
      return <h3 style={{textAlign: 'right', paddingRight: '1rem', paddingTop: '3rem'}}>Sum Total:</h3>
    }
  }
  const ListHeader = () =>{
    return(
      <div className="cart-list-header">
        <div className="sub-cart-list-header">
          <h1>Product</h1>
          <h1 className="display-none">Product name</h1>
          <h1>price </h1>
          <h1>quantity</h1>
          <h1>remove</h1>
          <h1>total</h1>

        </div>
        {items.length === 0 ? <h1 style={{textAlign: 'center', fontSize: '2.5rem', fontFamily: 'Montserrat', fontStyle: 'italic'}}>
        Cart is currently empty
        </h1> : ""}

        {items !== undefined ?
          items.map((item) => {
            const {title, img, price, count, total, id} = item
            return(
              <div key={id} className="cart-product-list">
                  <img src={img} alt="cart product" className="cart-product-img"/>
                  <p>{title}</p>
                  <p> ${price}</p>
                  <div className="control-btn">
                    <strong onClick={()=>quantity.decrementQuantity(id)}>-</strong>
                    <p>{count}</p>
                    <strong onClick={()=>quantity.incrementQuantity(id)}>+</strong>

                  </div>
                  <img src="https://img.icons8.com/ios-glyphs/30/fa314a/filled-trash.png"
                  className='fa-del'
                  alt='delete'
                  onClick={()=>quantity.deleteFromCart(id)}
                  />
                  <p><strong></strong>${total}</p>
                  {/* <a href="https://icons8.com/icon/67884/delete">Delete icon by Icons8</a> */}
              </div>

            )
          }) : ""
      
      }
      </div>
    
    )
  }
 
  return (
    <div className='cartitem-container'>
      {items.length > 0 ? <ListHeader /> : ""}

      <div>
        <CartTotalOrEmpty />
        <CartTotal />
      </div>
      
    </div>
  );
}
