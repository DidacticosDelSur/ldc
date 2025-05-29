import React, { Component, useContext, useState } from "react";
import { Button, Container, Dropdown, DropdownButton, Form, Image, InputGroup, Nav, Navbar, NavbarCollapse, NavDropdown } from "react-bootstrap";
import { Search, List, Envelope, Cart } from "react-bootstrap-icons";
import { isMobile } from "react-device-detect";

import { Link, useNavigate } from "react-router-dom";

import "./Header.scss";
import logo from "../assets/Logo.png";
import Menu from "./Menu";
import { AuthContext } from "../services/AuthContext";
import { User } from "lucide-react";
import "./Dropdown.scss"

export default function Header (){
  const [ inputValue, setInputValue ] = useState('');
  const { logout, isAuthenticated, user, cantProdCart } = useContext(AuthContext);
  const navigate = useNavigate();

  const search = () => {
    navigate('/buscar/'+inputValue);
  }
  const goProfile = () => {
    navigate('/perfil-usuario')
  }
  const handleLogOut = () => {
    logout();
    navigate('/')
  }
  const goCart = () => {
    navigate('/carrito')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  return (
    <header>
      <div className="fijo">
      <div className="top">
        <Link className="no-hover">
          <Image src={logo} />
        </Link>
        <div className="header-item">
          <div className="search-field">
            <InputGroup>
              <Form.Control
                placeholder="Buscar productos, marcas y más..." 
                value={inputValue}
                onChange={(e) => {setInputValue(e.target.value)}}
                onKeyDown={handleKeyDown}
              />
              <Button variant="outline-secondary" id="button-addon1" onClick={()=>{search()}}>
                <Search />
              </Button>
            </InputGroup>
          </div>
          <div className="right-bar">
            <div className="profile-data">
              {!isMobile 
                ? !isAuthenticated
                  ? <Link to={`/login`}>Iniciar Sesión</Link>
                  : <>
                    <DropdownButton
                      title={
                            <span>
                              <User />
                              {user.name}{user.clientName ? user.clientName != '' ? ` (${user.clientName})` : '' : ''}
                            </span>
                          }>
                        <Dropdown.Item onClick={()=>goProfile()}>Mi cuenta</Dropdown.Item>
                        <Dropdown.Item onClick={()=>handleLogOut()}>Cerrar Sesión</Dropdown.Item>
                      </DropdownButton>
                      <Button variant="outline" onClick={()=>goCart()}>
                        <Cart />
                        <div className="notifications">{cantProdCart}</div>
                      </Button>
                    </>
                : <div>Is Mobile</div>
              }
            </div>
            <div className="notification"></div>
          </div>
        </div>
      </div>
      </div>
      <div className="movil">
        <Menu />
      </div>
    </header>
  )
}