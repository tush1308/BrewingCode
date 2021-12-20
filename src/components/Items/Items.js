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
  Pagination
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Items.css";
import ItemType from "../ItemType/ItemType";
import LazyLoad from "react-lazy-load";

const Loading = () => (
  <div style={{height:"350px", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <CircularProgress/>
  </div>
)
export default function Items() {
  const [card, setCard] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentCard, setcurrentCard] = useState(1);
useEffect(() => {
    (async()=>{
        let itemData;
        try{
          let token = localStorage.getItem('itemName')
          console.log(token);
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

  function handleChange(event, value){
    setcurrentCard(value);
  }

  return (
    <>
    {/* <ItemType/> */}
    <Pagination count={5} currentCard={currentCard} onChange={handleChange} variant="outlined" className="pagi" color="primary"/>
        <Box ml={5} mr={5} pl={5} pr={5 } mt={2} pt={2} mb={1} pb={1}> 
        <Grid
          container
          spacing={3}
          alignContent="flex-start"
          justifyContent="center"
          marginleft={0}
          marginright={10}
        >
          {card.slice((currentCard-1)*4,currentCard*4).map((card,index) => {
            return (
              
              <Grid item xs={12} sm={6} md={4} lg={3} key={card.item_id}>
                <LazyLoad placeholder={<Loading/>}>
                <Link className="link" to={{ pathname: "/Items/" + card.item_id}}>
                
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
