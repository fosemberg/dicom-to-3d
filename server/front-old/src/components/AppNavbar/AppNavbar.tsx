import React from 'react';
import {Nav, Navbar, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar collapseOnSelect={true} expand="lg" bg="light" variant="light">
      <Container>
        <Link className="navbar-brand" to="/">Dicom to 3d</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link className="nav-link" to="/">Search</Link>
          </Nav>
          <Nav>
            <Link className="nav-link" to="/upload">Upload</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
