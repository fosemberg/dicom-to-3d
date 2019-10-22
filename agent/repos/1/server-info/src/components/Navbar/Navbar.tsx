import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const ServerInfoNavbar = () => {
  return (
    <Navbar collapseOnSelect={true} expand="lg" bg="light" variant="light">
      <Link className="navbar-brand" to="/">Server info</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">Параметры сервера</Link>
          <Link className="nav-link" to="/settings">Настройки</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ServerInfoNavbar;