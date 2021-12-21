import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import  { useHistory } from 'react-router-dom'

const theme = createTheme();

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bName, setBName] = useState("");
  const [bLocation, setBLocation] = useState("");
  const [bPincode, setbPincode] = useState("");
  const [seller, setSeller] = useState(false);
  const [isLoading, setLoading] = useState(true);

 const history = useHistory();
 const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    createacc();
  };

  async function createacc() {
    // console.log("hello");
    try {
      let result = await fetch(
        "https://rats-hackathon.herokuapp.com/login-signup/register/",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password,
            business_name: bName,
            business_location: bLocation,
            is_seller: seller,
            business_pincode: bPincode
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
        
      );
      result = await result.json();
      // console.log(result);
      if(result.old_token){
        alert("Signed in Successfully! Please verify your email");
        history.push("/");
      }
    } catch (error) {
      console.log("Error" + error);
      setLoading(false);
     }
  }
   

  

  return (
    <div style={{ backgroundColor: "#90B8F8" }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    type="text"
                    value={firstName.trim()}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={lastName.trim()}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    style={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email.trim()}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    style={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password.trim()}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="bName"
                    label="Business Name"
                    name="bName"
                    type="text"
                    value={bName.trim()}
                    onChange={(e) => setBName(e.target.value)}
                    style={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="bLocation"
                    label="Business Location"
                    name="bLocation"
                    type="text"
                    value={bLocation.trim()}
                    onChange={(e) => setBLocation(e.target.value)}
                    style={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="b_pincode"
                    label="Business Pincode"
                    type="number"
                    id="b_pincode"
                    autoComplete="b_pincode"
                    value={bPincode.trim()}
                    onChange={(e) => setbPincode(e.target.value)}
                    style={{ backgroundColor: "white" }}
                  />
                </Grid>
                <Grid item xs={12}>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e) => setSeller(e.target.value)}>
        <FormControlLabel value="yes" control={<Radio />} label="seller" />
        <FormControlLabel value="no" control={<Radio />} label="buyer" />
        </RadioGroup>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#353941" }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
