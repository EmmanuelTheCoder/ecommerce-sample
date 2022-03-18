import '../App.css';

export default function CartItems({items}) {

  const ListHeader = () =>{
    return(
      <div className="cart-list-header">
        <div className="sub-cart-list-header">
          <h1>Product</h1>
          <h1 className="display-none">Product name</h1>
          <h1>price </h1>
          <h1>quantity</h1>
          <h1>remove</h1>
          <h1>total</h1>

        </div>
        {items.length === 0 ? <h1 style={{textAlign: 'center', fontSize: '2.5rem', fontFamily: 'Montserrat', fontStyle: 'italic'}}>
        Cart is currently empty
        </h1> : ""}

        {items !== undefined ?
          items.map(item => {
            const {title, img, price, count, total} = item
            return(
              <div key={item.id} className="cart-product-list">
                  <img src={img} alt="cart product" className="cart-product-img"/>
                  <p>{title}</p>
                  <p> {price}</p>
                  <p className='btn'><strong className='toggle-count'>-</strong>{count} 
                  <strong className='toggle-count'>+</strong>
                  </p>
                  <img src="https://img.icons8.com/ios-glyphs/30/fa314a/filled-trash.png"
                  className='fa-del'
                  alt='delete'
                  />
                  <p><strong></strong>${total}</p>
                  {/* <a href="https://icons8.com/icon/67884/delete">Delete icon by Icons8</a> */}
              </div>

            )
          }) : ""
      
      }
      </div>
    
    )
  }
  
  const DisplayItems = () =>{
      if(items.length === 0){
        return <h1 style={{textAlign: 'center', fontSize: '2.5rem', fontFamily: 'Montserrat', fontStyle: 'italic'}}>Cart is currently empty</h1>
      }
      if(items !== undefined){

        return items.map(item =>{
         const {title, img, price, count, total} = item
         
          console.log("items to be displayed", item)
          return(
            <div key={item.id} className="cart-product-list">
                <img src={img} alt="cart product" className="cart-product-img"/>
                <p>{title}</p>
                <p> <strong>{price}</strong></p>
                <p className='btn'><strong className='toggle-count'>-</strong>{count} 
                <strong className='toggle-count'>+</strong>
                </p>
                <img src="https://img.icons8.com/ios-glyphs/30/fa314a/filled-trash.png"
                className='fa-del'
                alt='delete'
                />
                <p><strong></strong>${total}</p>
                {/* <a href="https://icons8.com/icon/67884/delete">Delete icon by Icons8</a> */}
            </div>
          )
        })
      }


    }
  return (
    <div className='cartitem-container'>
      {items.length > 0 ? <ListHeader /> : ""}
      
    </div>
  );
}
