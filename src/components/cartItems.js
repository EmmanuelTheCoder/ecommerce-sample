//const {title, img, price, count, total} = items

import '../App.css';

export default function CartItems({items}) {
    //console.log("items to be displayed", items)

    const DisplayItems = () =>{
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
      }else if (items.length === 0){
        return <h1>Cart is currently empty</h1>
      }

    }
  return (
    <div className='cartitem-container'>
      <DisplayItems /> 
    </div>
  );
}
