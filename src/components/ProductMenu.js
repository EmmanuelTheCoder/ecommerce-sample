import React from 'react'
import {ProductConsumer} from '../context';
import Product from './Product';
import '../App.css'



export default function Productmenu() {
    
    return (
        <div
            className="change-display"
        >
            
            <ProductConsumer>
               {value=>(
                   value.products.map(product =>(
            

                    <Product key={product.id} product={product} />
                        

                   ))
               )} 
            </ProductConsumer>
        </div>
    )
}
