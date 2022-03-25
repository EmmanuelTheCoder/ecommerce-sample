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
    sumTotal: 0  
    
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

const CartTotal = () =>{
    const sumValue = [...getProduct.cart]
    const arrayOfCartTotal = sumValue.map(val => val.total)
    const sum = arrayOfCartTotal.reduce((a,b) => a + b, 0)

    setGetProduct(() =>{
        return {...getProduct, sumTotal: sum}
    })

    console.log("from cart total", getProduct.sumTotal)

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


// const copyCart =[...getProduct.cart]
// let newArray = [];

// copyCart.map(val => {
//     let total = val.total;
//     newArray = [...newArray, total]
//     const sumValue = copyCart.reduce((a,b) => a + b);

//     setGetProduct(() =>{
//         return {...getProduct, sumTotal: sumValue}
//     })
//     return sumValue
// });

// console.log("copy cart", getProduct.sumTotal)




const incrementQuantity = (id) =>{
    let tempProduct = [...getProduct.products]
    const index = tempProduct.indexOf(getItem(id))
    const product = tempProduct[index]
    
    product.count = product.count + 1
    product.total = product.price * product.count
    
    
    
    
    
    const sumValue = [...getProduct.cart]
    const arrayOfCartTotal = sumValue.map(val => val.total)
    const sum = arrayOfCartTotal.reduce((a,b) => a + b, 0)
    console.log("summation", sum)
    setGetProduct(()=>{
        return {...getProduct, cart: [...getProduct.cart], sumTotal: sum}
    });
    
    console.log("sum from state", getProduct.sumTotal)

}

const deleteFromCart = (id) =>{
    const removeItem = getProduct.cart.filter(prod => prod.id !== id);

    const tempProduct = [...getProduct.cart]
    const index = tempProduct.indexOf(getItem(id))
    const product = tempProduct[index];

    product.inCart = false;

    
    setGetProduct(() =>{
        return {...getProduct, cart: [...removeItem] }
    });


    console.log("remove item", removeItem)

}

const decrementQuantity = (id) =>{
    const tempProduct = [...getProduct.products]
    const index = tempProduct.indexOf(getItem(id));
    const product = tempProduct[index];

  
        
        product.count = product.count - 1
        product.total = product.price * product.count;
        setGetProduct(() =>{
            return {...getProduct, cart: [...getProduct.cart]}
        })
    
    
    if(product.count === 0){

        deleteFromCart(id)
    }

    // if(product.count === 0){
    //     deleteFromCart(id)
    // }

    //https://lornajane.net/resource/what-is-devrel


    


    // setGetProduct(() =>{
    //     return {...getProduct, cart: [...getProduct.cart, product]}
    // })
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
           deleteFromCart: deleteFromCart,
           CartTotal: CartTotal
           
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