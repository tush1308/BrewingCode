import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Button,
  Grid,
  TextField
} from "@mui/material";

import { useEffect, useState } from "react";
import "./ItemDetails.css";
import { Link } from "react-router-dom";

export default function ItemDetails(props) {
  const [card, setCard] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("");
  const [orderItem, setOrderitem] = useState("");

  useEffect(() => {
    (async () => {
      // console.log(props.match.params.item_id)
      let itemData;
      try {
        let token = localStorage.getItem("itemName");
        let id = props.match.params.item_id;
        setOrderitem(id);
        let response = await fetch(
          `https://rats-hackathon.herokuapp.com/main/item_detail/${id}/`,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(quantity);
    console.log(orderItem);
    createOrder();
  };

  async function createOrder() {
    console.log("order");
    try {
      let token = localStorage.getItem("itemName");
      let userId = localStorage.getItem("userId");
      let result = await fetch(
        "https://rats-hackathon.herokuapp.com/main/ordered_item/",
        {
          method: "POST",
          body: JSON.stringify({
            quantity: quantity,
            cart_item: Number(orderItem),
            created_by: Number(userId),
          }),
          headers: {
            "Content-Type": "application/json",

            Authorization: `token ${token}`,
          },
        }
      );
      //console.log(token);
      result = await result.json();
      console.log(result);
    } catch (error) {
      console.log("Error" + error);
    }
  }

  return (
    <div className="container">
      <div className="card-div">
        <Card
          sx={{
            display: "flex",
            marginTop: "20px",
            marginLeft: "50px",
            marginRight: "50px",
          }}
          className="card-body"
        >
          <div className="section">
            <CardContent className="card-content">
              <Typography component="div" variant="h4">
                {card.item_name}
                {/* hvvsdc */}
              </Typography>
              <Typography variant="h5" component="div">
                {card.item_brand}
                {/* wdcfv */}
              </Typography>
            </CardContent>
            <div className="card-details">
              <Typography variant="h6" component="div" color={"#353941"}>
                Price: {card.item_price}
                {/* sdvvd */}
              </Typography>
            </div>
          </div>

          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={card.item_image}
            alt={card.item_name}
            className="card-image"
          />
          <div className="order">
            <div className="input-field">
              <TextField
                required
                fullWidth
                name="quantity"
                label="quantity"
                type="text"
                id="quantity"
                autoComplete="new-quantity"
                value={quantity.trim()}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div className="request-btn">
              <Link to="/Cart">
                <Button
                  className="btn"
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Request
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
