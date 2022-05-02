import React, {createContext, useCallback, useEffect, useState} from 'react';
//import {storeProducts, detailProduct} from './data';

export const ProductContext = createContext();


const ProductProvider = ({children}) => {
    
    const [getProduct, setGetProduct] = useState({
    
        products: [],
        detailProduct: {},
        cart: [],
        modalOpen: false,
        modalProduct: {},
        sumTotal: 0
        
    });

const fetchDataFromServer = useCallback(()=>{

    fetch("http://localhost:8000/data")
    .then(res => res.json())
    .then(data => {
        setGetProduct(() => {
            return {products: data.storeProducts, 
                detailProduct: data.detailProduct, modalProduct: 
                data.detailProduct,
                cart: [],
                sumTotal: 0,
                modalOpen: false
            }
        })
       
        
       
    })
},[])

useEffect(() =>{
        
    fetchDataFromServer()
     
 }, [fetchDataFromServer]);
   


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

    const sumValue = [...getProduct.cart]
    const arrayOfCartTotal = sumValue.map(val => val.total);
    const sum = arrayOfCartTotal.reduce((a,b) => a + b);
    setGetProduct(()=>{
        return {...getProduct, modalOpen: false, sumTotal: sum}
    })
}


const incrementQuantity = (id) =>{
    let tempProduct = [...getProduct.products]
    const index = tempProduct.indexOf(getItem(id))
    const product = tempProduct[index]
    
    product.count = product.count + 1
    product.total = product.price * product.count
    
    const sumValue = [...getProduct.cart]
    const arrayOfCartTotal = sumValue.map(val => val.total)
    const sum = arrayOfCartTotal.reduce((a,b) => a + b)
    
    setGetProduct(()=>{
        return {...getProduct, cart: [...getProduct.cart], sumTotal: sum}
    });
    
    

}

const deleteFromCart = (id) =>{
    const removeItem = getProduct.cart.filter(prod => prod.id !== id);

    const tempProduct = [...getProduct.cart]
    const index = tempProduct.indexOf(getItem(id))
    const product = tempProduct[index];

    product.inCart = false;

    const sumValue = [...removeItem]
    const arrayOfCartTotal = sumValue.map(val => val.total);
    const sum = arrayOfCartTotal.reduce((a,b) => a + b, 0);

    console.log(removeItem);
    setGetProduct(() =>{
        return {...getProduct, cart: [...removeItem], sumTotal: sum }
    });


}

const decrementQuantity = (id) =>{
    const tempProduct = [...getProduct.products]
    const index = tempProduct.indexOf(getItem(id));
    const product = tempProduct[index];

  
        
        product.count = product.count - 1
        product.total = product.price * product.count;

        // sum total 

        const sumValue = [...getProduct.cart]
        const arrayOfCartTotal = sumValue.map(val => val.total);
        const sum = arrayOfCartTotal.reduce((a,b) => a + b);

        setGetProduct(() =>{
            return {...getProduct, cart: [...getProduct.cart], sumTotal: sum}
        })
    
    
    if(product.count === 0){

        deleteFromCart(id)
    }


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