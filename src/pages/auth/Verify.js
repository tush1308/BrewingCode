import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useParams } from "react-router";

export default function Verification() {

    const old_token = useParams().tok
    console.log(old_token)

    async function verify() {
        
        let result = await fetch("https://rats-hackathon.herokuapp.com/login-signup/register/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        })
        result = await result.json()

        console.log(result)
    }

    return (
        <center style={{ margin: '100px' }}>
            <h2>To verify your Email click on below button</h2>
            <Button variant="contained" onClick={verify} component={Link} to='/'>Verify</Button>
        </center>
    )
}