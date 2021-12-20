import './ItemType.css';
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { CardActionArea } from '@mui/material';

export default function ItemType()
{
    const handleFilter = (event) => {
        event.preventDefault();
        
        
      };
    const [item, setItem] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
  useEffect(() => {
      (async()=>{
          let itemData;
          try{
            let token = localStorage.getItem('itemName')
            console.log(token);
              let response = await fetch(
                          "https://rats-hackathon.herokuapp.com/main/item_type_detail/",
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
                  setItem(itemData);
      })();
    }, []);

    let settings = {
        infinite: false,
        speed: 1000,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                initialSlide: 2
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
              {  
            breakpoint: 960,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              initialSlide: 2
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2
            },
          },
        ],
      };
      return(
        <Container className="container">
           <Row>
        <Col>
            <Slider {...settings}>
              {item.map((slide,index) => {
                 return(
                   <div className="item-box" key={slide.item_category_id}>
                  <Card className="card-container">
                      <CardActionArea onClick={handleFilter}>
                  <Card.Body className="item-container">
                 <Card.Title className="item-category">{slide.item_category}</Card.Title>
                 </Card.Body>
                 </CardActionArea>
                </Card>
                </div>
                 );
              })}
            </Slider>
        </Col>
           </Row>
        </Container>
      );
}