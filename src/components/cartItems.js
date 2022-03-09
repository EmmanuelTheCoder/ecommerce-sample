

import '../App.css';

export default function CartItems({items}) {
  
  const DisplayItems = () =>{
      if(items.length === 0){
        return <h1 style={{textAlign: 'center', fontSize: '1.1rem', fontStyle: 'italic'}}>Cart is currently empty</h1>
      }
      if(items !== undefined){

        return items.map(item =>{
          const {title, img, price, count, total} = item
          console.log("items to be displayed", item)
          return(
            <div key={item.id}>
                <img src={img} alt="cart product" />
            </div>
          )
        })
      }


    }
  return (
    <div className='cartitem-container'>
      <DisplayItems /> 
    </div>
  );
}
