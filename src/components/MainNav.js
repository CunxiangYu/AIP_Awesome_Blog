import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap';

//Site NavBar (probably will be changed to Material-UI)
class MainNav extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Awesome Blog</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Sign up</NavItem>
            <NavItem eventKey={2} href="#">Sign in</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNav;
