import React from 'react'
import { ProductConsumer } from '../context';
import CartItems from './cartItems';


export default function Cart() {

    return (
        <div>
           <ProductConsumer >
                {value =>{

                    const {cart} = value;
                    console.log("destructuring cart", cart)
                    // console.log( "value from cart", value.cart);
                    // console.log("all properties", value.products)

                    const currentCartItem = value.products.filter(item => item.inCart === true)
                    console.log("added to cart ", currentCartItem)

                    return(
                        <div>
                            {currentCartItem.map(items =>(
                                <CartItems key={items.id} items={items}/>
                            ))}
                        </div>
                    );

                }}
           </ProductConsumer>
           
        </div>

    );
}
