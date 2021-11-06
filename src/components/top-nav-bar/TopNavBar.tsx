import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import './TopNavBar.scss'
import { useTranslation } from 'react-i18next'

const TopNavBar: React.FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Navbar expand="lg" className="bg">
        <Navbar.Brand href="#home">
          <img src={logo} className="logo" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">{t('common:nextTrain')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default TopNavBar
