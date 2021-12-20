import * as React from "react";
import { ShoppingCart } from "@mui/icons-material";
import { Nav, NavDropdown } from 'react-bootstrap'
import './Navbar.css';
import {useHistory} from 'react-router-dom';
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import logo from "../../assets/logo.webp";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// const pages = ["Brewing Code"];
// const settings = ["Logout"];

export default function Navbar() {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const history= useHistory();
  const logout = ()=>
  {
     localStorage.clear();
     history.push('/')
  }
  let name = localStorage.getItem('userName')
  return (
    <div className="navbar">
    <div className="navbar-left">
        <div className="brand-name">Brewing Code</div>
    </div>
    <div className="navbar-right">
    <ShoppingCart className="icon"/>
    {localStorage.getItem('userName')?
    <Nav className="navbar-right-element" >
      <NavDropdown title={name}>
        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    :null}
    </div>
    
    </div>
  );
};
