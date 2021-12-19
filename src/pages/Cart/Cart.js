import React, {useState} from "react";
import "./Cart.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Cart = () => {

  const [counter, setCounter] = useState(1);
  const incCounter = () => setCounter(counter + 1);
  let decCounter = () => setCounter(counter - 1);
  if(counter<=1) {
    decCounter = () => setCounter(1);
  }

  return (
    <div className="cart">
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
          {/* <input className="number" type="text" {counter} disabled /> */}
          <div className="number">{counter}</div>
          <span className="fas fa-plus add" onClick={incCounter}><AddIcon/></span>
        </div>

        <div className="price">
          <h3>100₹</h3>
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
  );
};

export default Cart;

