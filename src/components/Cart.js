import React from 'react'
import { ProductConsumer } from '../context'

export default function Cart(props) {

    return (
        <div>
           <ProductConsumer >
                {value =>{
                    console.log( "value from cart", value.cart);
                    console.log("all properties", value)
                }}
           </ProductConsumer>
           
        </div>

    );
}
