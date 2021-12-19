import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import login from "../../assets/login.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);

  const matches = useMediaQuery("(max-width:600px)");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    createacc();
  };

  const saveToken = (value) => {
    localStorage.setItem("itemName", value);
    localStorage.getItem("itemName");
    console.log(value);
  };
  async function createacc() {
    console.log("hello");
    try {
      let result = await fetch(
        "https://rats-hackathon.herokuapp.com/login-signup/login/",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      result = await result.json();
      console.log(result);
      saveToken(result.token);
    } catch (error) {
      console.log("Error" + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: login,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!matches && (
            <Grid item xs={4} sm={6.5} md={6} lg={5.5}>
              <img
                src={login}
                style={{ width: "220%", height: "100vh" }}
                alt="login"
              />
            </Grid>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ backgroundColor: "#90B8F8" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                value={email.trim()}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: "white" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password.trim()}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: "white" }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#353941" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
