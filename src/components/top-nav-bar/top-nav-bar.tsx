import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap'

const TopNavBar:React.FunctionComponent = () => (
  <div>
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Lohas Park Info</Navbar.Brand>
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