import React, {createContext, useCallback, 
    useEffect, useState} from 'react';
//import {storeProducts, detailProduct} from './data';
import {useVisitorData} from '@fingerprintjs/fingerprintjs-pro-react'

export const ProductContext = createContext();


const ProductProvider = ({children}) => {

    const {getData} = useVisitorData()
 
 
    const [getProduct, setGetProduct] = useState({
    
        products: [],
        detailProduct: {},
        cart: [],
        modalOpen: false,
        modalProduct: {},
        sumTotal: 0
        
    });

    const [visitorId, setVisitorId] = useState()
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
        
    //fetchDataFromServer()
     
 }, []);
   

 //send generated visitorId to the server
 const sendVisitorIdToServer = useCallback(() =>{
    fetch("http://localhost:8000/users", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
        }, 
        body: JSON.stringify({
            visitorId: visitorId
        }) 
    })
    .then(res => res.json())
    .then(data => console.log(data))
    

 },[visitorId])


 
//generate unique visitorId using fingerprints the call the func that
//sends it to the server
 useEffect(() =>{
    getData().then(data =>{
             
        if(data){
            const dataId = data.visitorId
            setVisitorId(dataId)
            
        }

    })

    visitorId && sendVisitorIdToServer()
    
    
}, [visitorId, sendVisitorIdToServer, getData])





 
 const retrieveCartFromServer = useCallback(() =>{
    fetch("http://localhost:8000/cart/findcart", {
        method: "POST",
        headers:{
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            visitorId: visitorId
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("cart item", data)
        return setGetProduct(() => {
            return {
                products: data.storeProducts, 
                detailProduct: data.detailProduct, 
                modalProduct: data.detailProduct,
                cart: data.collectCart,
                sumTotal: 0,
                modalOpen: false
            }
        })
    })
 }, [visitorId])

 useEffect(() =>{
    retrieveCartFromServer()
 }, [retrieveCartFromServer])

 //The 'retrieveCartFromServer' function makes the dependencies of useEffect Hook (at line 123) change on every render.
 // Move it inside the useEffect callback. Alternatively, wrap the definition of 'retrieveCartFromServer' in its own useCallback() Hook




 const sendCartItemToServer = (product, tempProducts) =>{
     
    fetch("http://localhost:8000/cart", {
        method: 'POST',
        
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cart: product,
            visitorId: visitorId
        })
    })
    .then(res => res.json())
    .then(data => {
        //return {...getProduct, products: tempProducts, cart: [...getProduct.cart, product]}
        return setGetProduct(() =>{
            return {...getProduct, products: tempProducts, cart: [...getProduct.cart, data]}
        })
    })

 }

 

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

    sendCartItemToServer(product, tempProducts)
    
    // setGetProduct(()=>{
    //     return {...getProduct, products: tempProducts, cart: [...getProduct.cart, product]}
        
    // });
   
  
}

const CartTotal = () =>{
    const sumValue = [...getProduct.cart]
    const arrayOfCartTotal = sumValue.map(val => val.total)
    const sum = arrayOfCartTotal.reduce((a,b) => a + b, 0)

    return setGetProduct(() =>{
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


    return setGetProduct(()=>{
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
           CartTotal: CartTotal,
           retrieveCartFromServer: retrieveCartFromServer
           
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



