import React from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';

export default function Modal(props) {
    

    return (
        <ProductConsumer>
            {value =>{
                const {closeModal,  modalOpen} = value;
                const {img, title, price} = value.modalProduct;

                if(!modalOpen){
                    return null
                }else{
                    return(
                        <ModalContainer>
                            <div className="container">
                                <div className="row">
                                    <div id="modal" className="col-9 mx-auto col-md-6 col-lg-4 text-center text-capitalize">
                                        <h5>item added to the cart</h5>
                                        <img src={img} alt="product" className="img-fluid"/>
                                        <h5>
                                            {title}
                                        </h5>
                                        <h5 className="text-muted">
                                            price: ${price}
                                        </h5>
                                        <Link to="/">
                                            <ButtonContainer onClick={()=>closeModal()}>
                                                store
                                            </ButtonContainer>
                                        </Link>
                                        <Link to="/cart">
                                            <CartBtn onClick={()=>{
                                                return closeModal();
                                            }}>
                                                go to cart
                                            </CartBtn>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ModalContainer>
                    )  
                }
            }}
        </ProductConsumer>
    )
}

const ModalContainer = styled.div`
position: fixed;
top: 0rem;
left: 0;
right: 0;
bottom: 0;
background: rgba(0,0,0,0.6);
/* height: 7rem; */
display: flex;
align-items: center;
justify-content: center;
color: #f8f0f0 !important;

.text-muted{
   color: white !important;
}
#modal{
    background: var(--mainWhite);
    
}


`
const CartBtn = styled.button`

margin-left: .8rem;
text-transform: capitalize;
height: 2.3rem;
background: #d8a442;
border-radius: 20px;
border: solid 1px orangered;
color: black;
font-size: 1.2rem;
font-family: sans-serif;


`
