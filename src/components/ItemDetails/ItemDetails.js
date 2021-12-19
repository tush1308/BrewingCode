import { Box, Card, Paper } from "@mui/material";
import { useEffect, useState } from "react";
export default function ItemDetails(props)
{
  const [card, setCard] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async()=>{
      console.log(props.match.params.item_id)
        let itemData;
        try{
            let response = await fetch(
              "https://rats-hackathon.herokuapp.com/main/item_detail/4/",
                        {
                          method: "GET",
                          headers: {
                            
                            Authorization: "token 362a2b4e67b29124b3141ed2d8cc063f9fa5f376"
                            
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
    return(<>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 500,
        },
      }}
    >
      
    <Paper elevation={3}>
    <div className="item-image">
        {card.item_image}
    </div>
    </Paper>
    
    </Box>
    </>);
}