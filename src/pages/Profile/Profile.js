import './Profile.css';
import { Divider, Chip } from '@mui/material';
import { Container, Col, Row } from 'react-bootstrap';
import {useState, useEffect} from 'react';
export default function Profile()
{
    const [card, setCard] = useState([]);
    const [firstName, setfirstName] = useState([]);
    const [lastName, setlastName] = useState("");
    const [bName, setBName] = useState("");
    const [bLocation, setbLocation] = useState("");
    const [bPincode, setbPincode] = useState("");
    const [seller, setSeller] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async()=>{
        let itemData;
        try{
          let userId = localStorage.getItem("userId");
          let token = localStorage.getItem('itemName')
          // console.log(token);
            let response = await fetch(
                        `https://rats-hackathon.herokuapp.com/login-signup/users/${userId}/`,
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
                      // console.log(itemData);
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

  

    return(
        <>
        <Container><Row><Col>
        <div className='profile'>Profile</div>
        <div className='profile-body'>
        <Divider textAlign="right"><Chip label="Email" className='divider'/></Divider>
        <div className="content">
         {card.email}
         </div>
         <Divider textAlign="right"><Chip label="First name" className='divider' /></Divider>
         <div className="content">
         {card.first_name}
         </div>
         <Divider textAlign="right"><Chip label="Last name" className='divider'/></Divider>
         <div className="content">
         {card.last_name}
         </div>
         <Divider textAlign="right"><Chip label="Business Name" className='divider'/></Divider>
        <div className="content">
         {card.business_name}
         </div>
         <Divider textAlign="right"><Chip label="Business Location" className='divider'/></Divider>
         <div className="content">
         {card.business_location}
         </div>
         <Divider textAlign="right"><Chip label="Business Pincode" className='divider'/></Divider>
         <div className="content">
         {card.business_pincode}
         
         </div>
         
        </div>
        </Col></Row></Container>
       

        
        </>
    );
}