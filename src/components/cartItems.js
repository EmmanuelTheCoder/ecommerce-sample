//const {title, img, price, count, total} = items

import '../App.css';

export default function CartItems({items}) {
    //console.log("items to be displayed", items)

    const displayItems = () =>{
      items.map(item =>{
        const {title, img, price, count, total} = item
        return(
          <div key={item.id}>
              <img src={img} alt="cart product" />
          </div>
        )
      })

    }
  return (
    <div className='cartitem-container'>
       {displayItems}
    </div>
  );
}
