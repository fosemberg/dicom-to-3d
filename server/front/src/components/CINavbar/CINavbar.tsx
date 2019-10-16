import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const CINavbar = () => {
  return (
    <Navbar collapseOnSelect={true} expand="lg" bg="light" variant="light">
      <Link className="navbar-brand" to="/">Fosemberg CI</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">Main</Link>
          <Link className="nav-link" to="/build">Build</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CINavbar;