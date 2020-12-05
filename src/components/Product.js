import React from 'react'
import styled from 'styled-components';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';
import '../App.css';
import { ProductConsumer} from '../context';

export default function Product(props) {
    
    const {id, price, img, title, inCart} = props.product;

    return (
        <div className="containers">
          
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
               <ProductConsumer>
                   {value =>{
                       return(
                            <div className="display-flex">
                
                            <div className="products">
                                    <div className="product-name">
                                        <h2>{title}</h2>
                                    </div>
                                    
                                <Link to="/details">
                                    <div className="image-container" onClick={()=>value.handleDetail(id)}>
                                        <img src={img} alt={title}/>
                                    </div>
                                
                                </Link>
            
                                <div className="price-cart-container">
            
                                    <h3> $<strong>{price}</strong></h3>
                                    <ButtonContainer cart disabled={inCart ? true : false}>
                                        {inCart ? "inCart" : "Cart"}
                                    </ButtonContainer>
                                </div>
                            </div>
                            </div> 
                       )
                   }}
               </ProductConsumer>
            </ProductWrapper>

        </div>
    )
}

const ProductWrapper = styled.div`
  
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  /* z-index: -1; */
 
    /* .display-flex{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    } */
    .products{
        box-shadow: .5px 1px 2px 1.5px  grey;
        width: 21rem;
        transition: 1s all ease;
        /* &:hover{
          transform: scale(1.05);
        } */
    }
    .image-container{
        transition: 1s all ease;
        img{
            width: 20rem;
            transition: 1s all ease;
            padding: .6rem;
        }
        text-align: center;
        &:hover img{
            transform: scale(1.1);
            /* padding: .5rem 0; */
        }
    }
  .product-name{
    background: rgb(214, 202, 202);
    text-align: center;
    font-family: 'Montserrat Alternates', sans-serif;
    height: 2.4rem;
  }
  .price-cart-container{
      display: flex;
      justify-content: space-between;
      
      h3{
          font-style: italic;
          font-size: 1.7rem;
      }
  }
  

`
