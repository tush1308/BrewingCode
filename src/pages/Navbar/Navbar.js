import * as React from "react";
import { ShoppingCart } from "@mui/icons-material";
import { Nav, NavDropdown } from "react-bootstrap";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.webp'

export default function Navbar() {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  const profile = () => {
    
    history.push("/profile");
  };
  let name = localStorage.getItem("userName");
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="brand-name">Brewing Code</div>
        <Link to="/Items">
        <div className="logo-div"><img src={logo} className="logo"/></div>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/Cart">
          <ShoppingCart className="icon" />
        </Link>
        {localStorage.getItem("userName") ? (
          <Nav className="navbar-right-element" >
            <NavDropdown className ="user-name" title={name}>
              <NavDropdown.Item onClick={profile}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : null}
      </div>
    </div>
  );
}
