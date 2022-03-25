import React from 'react'
import { ProductConsumer } from '../context';
import CartItems from './cartItems';


export default function Cart() {

    return (
        <div>
           <ProductConsumer >
                {value =>{
                    const {cart} = value;
                    return(
                        <div>
                            <CartItems items={cart}/>
                        </div>
                    );

                }}
           </ProductConsumer>
           
        </div>

    );
}
