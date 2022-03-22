import React, {createContext, useState} from 'react';
import {storeProducts, detailProduct} from './data';

export const ProductContext = createContext();


const ProductProvider = ({children}) => {
const [getProduct, setGetProduct] = useState({

    products: storeProducts,
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    
    
});

const getItem = (id) =>{
    const product = getProduct.products.find(items => items.id === id);
    return product;
}

const handleDetail = (id) =>{
    const product = getItem(id);
    setGetProduct(()=>{
        return {...getProduct, detailProduct: product}
    });
}
const addToCart = (id) =>{
    let tempProducts = [...getProduct.products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    
     setGetProduct(()=>{
        return {...getProduct, products: tempProducts, cart: [...getProduct.cart, product]}
        
    });
   
  
}


const openModal = id =>{
    const product = getItem(id);

    let tempProducts = [...getProduct.products];
    const index = tempProducts.indexOf(getItem(id));
    let cartProduct = tempProducts[index];
    cartProduct.inCart = true;
    cartProduct.count = 1;
    const price = cartProduct.price;
    cartProduct.total = price;
    setGetProduct(()=>{
        return {...getProduct, modalProduct: product, modalOpen: true, products: tempProducts, cart:[...getProduct.cart, cartProduct]}
    })
}
const closeModal = () =>{
    setGetProduct(()=>{
        return {...getProduct, modalOpen: false}
    })
}
const incrementQuantity = (id) =>{
    let tempProduct = [...getProduct.products]
    const index = tempProduct.indexOf(getItem(id))
    const product = tempProduct[index]

    product.count = product.count + 1
    product.total = product.price * product.count

    setGetProduct(()=>{
        return {...getProduct, cart: [...getProduct.cart, product]}
    })
}

const deleteFromCart = (id) =>{
    const removeItem = getProduct.cart.filter(prod => prod.id !== id)
    
    setGetProduct(() =>{
        return {...getProduct, cart: [...removeItem] }
    });

    console.log("remove item", removeItem)

}

const decrementQuantity = (id) =>{
    const tempProduct = [...getProduct.products]
    const index = tempProduct.indexOf(getItem(id));
    const product = tempProduct[index];

    if(product.count > 1){

        product.count = product.count - 1
        product.total = product.price * product.count
    }else if(product.count < 1){
        deleteFromCart(id)
    }else{

    }


    setGetProduct(() =>{
        return {...getProduct, cart: [...getProduct.cart, product]}
    })
}
    return(
       <ProductContext.Provider value={{
           ...getProduct,
           handleDetail: handleDetail,
           addToCart: addToCart,
           openModal: openModal,
           closeModal: closeModal,
           incrementQuantity: incrementQuantity,
           decrementQuantity: decrementQuantity,
           deleteFromCart: deleteFromCart
           
       }} >
           {children}
       </ProductContext.Provider>
    );
}

const ProductConsumer = ProductContext.Consumer;

export {ProductConsumer, ProductProvider}






// font-family: 'Lato', sans-serif;
// font-family: 'Montserrat Alternates', sans-serif;
// font-family: 'Sansita Swashed', cursive;