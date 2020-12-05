import React from 'react'
import {ProductConsumer} from '../context';
import styled from 'styled-components';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';

export default function Details(props) {
    

    return (
        <div>
            <ProductConsumer>
                {value =>{
                     const {price, img, id, company, title, info, inCart} = value.detailProduct
                  
                     return(
                         <DetailContainer className="container" >
                             <div className="company">
                                 <h2 title="black gown">{title}</h2>
                             </div>
                             <div className="image-container">
                                 <img src={img} alt="title"/>
                             </div>
                             <div className="price">
                                <h2><strong>Price: </strong>${price}</h2>
                                <h3><strong>Company:</strong> {company}</h3>
                             </div>
                             <div className="description">
                                 <strong>Product description: </strong>
                                 <p className="product-info">
                                     {info}
                                 </p>
                             </div>
                             <div className="buttons">
                                <Link to="/">
                                    <button type="button" className="back-to-product">
                                        Back to products
                                    </button>
                                </Link> 
                                <button type="button" className="add-to-cart" disabled={inCart ? true : false}>
                                    {inCart ? "inCart" : "add to cart"}
                                    </button>
                             </div>
                         </DetailContainer>
                     )
                }}
                
            </ProductConsumer>
           
        </div>
    )
}

const DetailContainer = styled.div`
    margin-top: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    div{
        text-align: center;
    }
    .company h2{
        text-transform: capitalize;
        font-family: cursive;
        font-size: 2.1rem;
        font-weight: 400;
        color: #474747;
        
    }
    .description{
            padding-top: 1.2rem;
            p{
                font-size: 1.2rem;
            }
        strong{
            font-size: 1.4rem;
            color: #524e4f
        }
    }
    .price{
        text-align: justify;
        strong{
            color: #524e4f
        }
    }
    .buttons{
        display: block;
        margin-top: 1.4rem;
    }
    .back-to-product{
        margin-right: 2rem;
        padding: .4rem .8rem;
        border-radius: 40px;
        text-transform: capitalize;
        background: transparent;
        font-family: sans-serif;
        font-size: 1.3rem;
        color: #048286;
        border: 2px solid #048286;
        outline: none;

        &:hover{
            background: #048286;
            color: white;
        }
    }
    .add-to-cart{
        margin-right: 2rem;
        padding: .4rem .8rem;
        border-radius: 40px;
        text-transform: capitalize;
        background: transparent;
        font-family: sans-serif;
        font-size: 1.3rem;
        color: #8b7b44;
        border: 2px solid #5f8604;
        outline: none;

        &:hover{
            background: #f3c52c;
            color: black;
        }
    }
    
`
