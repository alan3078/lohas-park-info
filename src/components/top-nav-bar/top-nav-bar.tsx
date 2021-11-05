import React from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import './top-nav-bar.scss'
import { useTranslation } from 'react-i18next'
import changeLanguage from '../../helpers/changeLanguage'
import { languages } from '../../i18n'

const TopNavBar: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation()
  const { language: currentLanguage } = i18n
  const displayLangs = languages.filter((c) => c !== currentLanguage)[0]

  return (
    <div>
      <Navbar expand="lg" className="bg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} className="logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">{t('common:nextTrain')}</Nav.Link>
              <Button variant="outline-dark" onClick={() => changeLanguage(displayLangs)} >{t(`common:${displayLangs}`)}</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default TopNavBar
