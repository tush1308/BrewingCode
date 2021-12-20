import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Button
} from "@mui/material";

import { useEffect, useState } from "react";
import './ItemDetails.css'
  
export default function ItemDetails(props)
{
  const [card, setCard] = useState([]);
  const [isLoading, setLoading] = useState(true);

  
  useEffect(() => {
    (async () => {
      // console.log(props.match.params.item_id)
      let itemData;
      try {
        let token = localStorage.getItem("itemName");
        let id = props.match.params.item_id;
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
  return (
    <div className="container">
      <div className="card-div">
       <Card sx={{ display: 'flex', marginTop: '20px', marginLeft: '50px', marginRight: '50px'}} className="card-body">
        
        <div className="section">
        <CardContent className="card-content">
          <Typography component="div" variant="h4">
           {card.item_name}
           {/* hvvsdc */}
          </Typography>
          <Typography variant="h5"  component="div">
            {card.item_brand}
            {/* wdcfv */}
          </Typography>
        </CardContent>
        <div className="card-details">
        <Typography variant="h6"  component="div" color={"#353941"}>
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
        <Typography>Enter Quantity: </Typography>
        <input type="text" className="quantity" name="quantity"></input>
        </div>
        <div className="request-btn">
        <Button className="btn" variant="outlined">
        Request
        </Button>
        </div>
        </div>
    </Card>
    </div>
    </div>
  );
}
