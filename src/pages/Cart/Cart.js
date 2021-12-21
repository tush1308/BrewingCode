import React, { useState, useEffect } from "react";
import "./Cart.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Cart = () => {
  const [card, setCard] = useState([]);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [id, setId] = useState(0);

  let filtered = [];
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    (async () => {
      let itemData, productData;
      try {
        let token = localStorage.getItem("itemName");
        let userId = localStorage.getItem("userId");
        setId(userId);
        // console.log(setId);
        let response = await fetch(
          "https://rats-hackathon.herokuapp.com/main/ordered_item/",
          {
            method: "GET",
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        const items = await fetch(
          "https://rats-hackathon.herokuapp.com/main/item",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
          }
        );
        itemData = await response.json();
        productData = await items.json();
        // console.log(itemData);
        // console.log(productData);
        setItems(productData);
        setData(itemData);
        let j = 0;
        for (let i = 0; i < itemData.length; i++) {
          // console.log(itemData[i].created_by);
          // console.log(Number(id))
          if (itemData[i].created_by === Number(id)) {
            filtered[j] = itemData[i];
            // console.log("hello");
            // console.log(itemData[i])
            j = j + 1;
          }
        }
        // console.log(filtered);
        setFilter(filtered);
      } catch (error) {
        console.log("Error" + error);
        itemData = [];
      } finally {
        setLoading(false);
      }
      setCard(itemData);
    })();
  }, []);

  const Item_search = (props) => {
    let Found = "";
    for (let i = 0; i < items.length; i++) {
      if (items[i].item_id === props.id) {
        Found = items[i].item_name;
        // console.log(Found);
        return (
          <p>
            {items[i].item_name} {items[i].item_brand}
          </p>
        );
      }
    }
  };

  return (
    <>
      <center>
        <h1>Cart</h1>
      </center>
      {card.map((card) => {
        return (
          <div className="cart" key={card.id}>
            <div className="items-info">
              {/* <div className="product-img">
                <img
                  src="https://images.immediate.co.uk/production/volatile/sites/4/2018/07/GettyImages-176875573-4581401.jpg?quality=90&resize=940%2C400"
                  alt=""
                />
              </div> */}

              <div className="title">
                <h2>
                  <Item_search id={card.cart_item} />
                </h2>
                <h3>Price: </h3>
                <h4>Rs {card.price}</h4>
              </div>

              <div className="price">
                <h3>Discount</h3>
                <h4>Rs {card.discount}</h4>
              </div>

              <div className="remove-item">
                <span
                  className="fas fa-trash-alt remove"
                  /*onClick={() => removeItem(id)}*/
                >
                  <DeleteForeverIcon sx={{ fontSize: 30 }} />
                </span>
              </div>
            </div>

            <hr />
          </div>
        );
      })}
    </>
  );
};

export default Cart;
