import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import './TopNavBar.scss'
import { useTranslation } from 'react-i18next'
import Weather from '../weather/Weather'

const TopNavBar: React.FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="top-nav-bar-wrapper">
      <Navbar expand="lg" className="top-nav-bar">
        <div className="nav-branch-container">
          <div>
            <img src={logo} className="logo" alt="logo" />
          </div>
          <div>
            <Weather />
          </div>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="#home">{t('common:nextTrain')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default TopNavBar
