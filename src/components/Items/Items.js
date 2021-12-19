import React, {useEffect, useState} from "react";
import {
  CardActionArea,
  Grid,
  Card,
  Box,
  CircularProgress,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Items.css";
import { BLUE2, BLACK } from "../../styles/colours";
import LazyLoad from "react-lazy-load";

//c47302bd1e471b3115d244ea7c372defeb71c390
const Loading = () => (
  <div style={{height:"350px", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <CircularProgress/>
  </div>
)
export default function Items() {
  const [card, setCard] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  const hello = ()=>
  {
      console.log("hello");
  }

useEffect(() => {
    (async()=>{
        let itemData;
        try{
          let token = localStorage.getItem('itemName')
            let response = await fetch(
                        "https://rats-hackathon.herokuapp.com/main/item/",
                        {
                          method: "GET",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `token ${token}`,
                            Accept: "application/json",
                          },
                        }
                      );
                      itemData = (await response.json());
                      console.log(itemData);
        }
        catch (error) {
                  console.log("Error" + error);
                  itemData=[];
                } finally {
                  setLoading(false);
                }
                setCard(itemData);
    })();
  }, []);
  return (
    <>
        
        <Box ml={5} mr={5} pl={5} pr={5 } mt={2} pt={2} mb={1} pb={1}> 
        <Grid
          container
          spacing={3}
          alignContent="flex-start"
          justifyContent="center"
          marginleft={0}
          marginright={10}
        >
          {card.map((card) => {
            return (
              
              <Grid item xs={12} sm={6} md={4} lg={3} key={card.item_id}>
                <LazyLoad placeholder={<Loading/>}>
                <Link className="link" to={{ pathname: "/Home/Items/" + card.item_id}}>
                
                  <CardActionArea>
                  
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{
                    height: "280px",
                    borderRadius: "10px",
                    backgroundColor: "#90B8F8",
                  }}
                >
                    <CardMedia
                      component="img"
                      height="180"
                      image={card.item_image}
                      className="item-image"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="item-name"
                        style={{ color: "#353941" }}
                      >
                        {card.item_name}
                      </Typography>
                      <div className="item-details">
                      <Typography
                        variant="h6"
                        className="item-element"
                        style={{ color: "#353941" }}
                      >
                             {card.item_brand}
                      </Typography>
                      <div className="price-quantity">
                      <Typography
                        variant="body2"
                        className="item-element"
                        style={{ color: "#353941" }}
                      >
                        Price: {card.item_price}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="item-element"
                        style={{ color: "#353941" }}
                      >
                        Quantity: {card.available_quantity}
                      </Typography>
                      </div>
                      </div>
                    </CardContent>
                  
                </Card>
                
                </CardActionArea>
               
                </Link>
                </LazyLoad>
              </Grid>
            );
          })}
        </Grid>
        </Box> 
      
    </>
  );
}
//   const CardInfo = [
//     {
//       Item_image:
//         "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//       Item_name: "shoes",
//       Item_type: "pink",
//       Price: "100",
//       Quantity: 10,
//       id: 1,
//     },

//     {
//       Item_image:
//         "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//       Item_name: "shoes dvcef vefv",
//       Item_type: "orange hbc",
//       Price: "100",
//       Quantity: 10,
//       id: 2,
//     },

//     {
//       Item_image:
//         "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//       Item_name: "paint",
//       Item_type: "whbcj ecdc cwehc",
//       Price: "100",
//       Quantity: 10,
//       id: 3,
//     },

//     {
//       Item_image:
//         "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//       Item_name: "sdbchbbhdbc wbh",
//       Item_type: "pinkwcewdcwdc",
//       Price: "1000",
//       Quantity: 367,
//       id: 4,
//     },
//   ];