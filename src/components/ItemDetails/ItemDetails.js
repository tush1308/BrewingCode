import {
  Card,
  Box,
  Typography,
  CardMedia,
  CircularProgress,
  CardContent
} from "@mui/material";
import { useEffect, useState } from "react";

import './ItemDetails.css'
export default function ItemDetails(props) {
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
        image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt="Live from space album cover"
        className="card-image"
      />
      
    </Card>
    </div>
  );
}
