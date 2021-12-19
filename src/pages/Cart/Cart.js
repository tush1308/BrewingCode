import React from "react";
import "./Cart.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Cart = () => {
  return (
    <div>
      <div className="items-info">
        <div className="product-img">
          <img
            src="https://images.immediate.co.uk/production/volatile/sites/4/2018/07/GettyImages-176875573-4581401.jpg?quality=90&resize=940%2C400"
            alt="iamge"
          />
        </div>

        <div className="title">
          <h2>Paint</h2>
          <p>description</p>
        </div>

        <div className="add-minus-quantity">
          <i
            className="fas fa-minus minus" /*onClick={() => decrement(id)}*/
          ><RemoveIcon/></i>
          <input type="text" placeholder="7" disabled />
          <i className="fas fa-plus add" /*onClick={() => increment(id)}*/><AddIcon/></i>
        </div>

        <div className="price">
          <h3>100₹</h3>
        </div>

        <div className="remove-item">
          <i
            className="fas fa-trash-alt remove"
            /*onClick={() => removeItem(id)}*/
          ><DeleteForeverIcon sx={{ fontSize: 30 }}/></i>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Cart;

