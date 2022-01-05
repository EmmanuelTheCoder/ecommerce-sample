import React from 'react'
import { ProductConsumer } from '../context';



export default function Cart() {

    return (
        <div>
           <ProductConsumer >
                {value =>{

                    const {cart} = value;
                    console.log("destructuring cart", cart)
                    // console.log( "value from cart", value.cart);
                    // console.log("all properties", value.products)

                    const addedToCart = value.products.filter(item => item.inCart === true)
                    console.log("added to cart ", addedToCart)

                    return(
                        <div>
                            
                            {addedToCart.map((item, index) =>{
                                return(
                                    <div className="cart-items" key={index}>

                                    </div>
                                )    
                            })}
                        </div>
                    );

                }}
           </ProductConsumer>
           
        </div>

    );
}
