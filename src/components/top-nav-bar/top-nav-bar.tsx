import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import './top-nav-bar.scss'

const TopNavBar: React.FunctionComponent = () => (
  <div>
    <Navbar expand="lg" className="bg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} className="logo" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
)

export default TopNavBar