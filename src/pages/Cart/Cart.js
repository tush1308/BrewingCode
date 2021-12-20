import React, {useState, useEffect} from "react";
import "./Cart.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Cart = (props) => {
  const [counter, setCounter] = useState(1);
  const [card, setCard] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [orderItem, setOrderitem] = useState("");
  const incCounter = () => setCounter(counter + 1);
  let decCounter = () => setCounter(counter - 1);
  if(counter<=1) {
    decCounter = () => setCounter(1);
  }

  useEffect(() => {
    (async () => {
      let itemData;
      try {
        let token = localStorage.getItem("itemName");
        let id = props.match.params.item_id;
        setOrderitem(id);
        let response = await fetch(
          "https://rats-hackathon.herokuapp.com/main/ordered_item/",
          {
            method: "GET",
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        itemData = await response.json();
        console.log(itemData);
        
      } catch (error) {
        console.log("Error" + error);
        itemData = [];
      } finally {
        setLoading(false);
      }
      setCard(itemData);
    })();
  }, []);

  return (
    <>
    
    {
      card.map((card,index)=>{
      <div className="cart" key={card.id}>
<div className="items-info">
        <div className="product-img">
          <img
            src="https://images.immediate.co.uk/production/volatile/sites/4/2018/07/GettyImages-176875573-4581401.jpg?quality=90&resize=940%2C400"
            alt=""
          />
        </div>

        <div className="title">
          <h2>Paint</h2>
          <p>description</p>
        </div>

        <div className="add-minus-quantity">
          <span
            className="fas fa-minus minus" onClick={decCounter}
          ><RemoveIcon/></span>
          <div className="number">{counter}</div>
          <span className="fas fa-plus add" onClick={incCounter}><AddIcon/></span>
        </div>

        <div className="price">
          <h3>{card.price}</h3>
        </div>

        <div className="remove-item">
          <span
            className="fas fa-trash-alt remove"
            /*onClick={() => removeItem(id)}*/
          ><DeleteForeverIcon sx={{ fontSize: 30 }}/></span>
        </div>
      </div>

      <hr />
      </div>
      })
    }
    
      
    </>
  );
};

export default Cart;

