import './Profile.css';
import { Divider, Chip } from '@mui/material';
import { Container, Col, Row } from 'react-bootstrap';
export default function Profile()
{
    return(
        <>
        <Container><Row><Col>
        <div className='profile-body'>
        <Divider><Chip label="email" /></Divider>
         sanikaardekar@gmail
         <Divider><Chip label="firstname" /></Divider>
         sanika
         <Divider><Chip label="lastname" /></Divider>
         ardekar
         <Divider><Chip label="business location" /></Divider>
         mumbai
         <Divider><Chip label="seller or buyer" /></Divider>
         s/b
         <Divider><Chip label="business pincode" /></Divider>
         400101

        </div>
        </Col></Row></Container>
       

        
        </>
    );
}