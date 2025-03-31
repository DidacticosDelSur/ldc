import React, { Component } from "react";
import { Button, Container, Form, Image, InputGroup, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Search, List, Envelope, Cart } from "react-bootstrap-icons";
import { isMobile } from "react-device-detect";

import { Link } from "react-router-dom";

import "./Header.scss";
import logo from "../assets/Logo.png";
import Menu from "./Menu";
import { AuthContext } from "../services/AuthContext";

class Header extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      searhInput: ''
    }
  }

  handleChange = (event) => {
    this.setState({ searhInput: event.target.value }); // Actualizamos el estado con el nuevo valor del input
  };

  handleClick = () => {
    window.location.href = '#/buscar/'+this.state.searhInput; // Accedemos al valor del input a través del estado
  };

  handleCart = () => {
    window.location.href = '#/carrito'; // Accedemos al valor del input a través del estado
  };

  handleLogOut = () => {
    const { logout } = this.context;
    logout();
    window.location.href = '#/';
  }

  handleProfile = () => {
    window.location.href = '#/perfil_usuario';
  }

  render() {
    const { user, cantProdCart } = this.context;
    return (
      <header>
        <div className="header-top">
          <div className="header-content content">
            <div className="header-item">
              {!isMobile && <span className="mobile-hide"> Email: </span>}

              <a href="mailto:tienda.libdelcol@gmail.com" target="_blank" rel="noreferrer">
                {!isMobile && <span>tienda.libdelcol@gmail.com</span>}
                {isMobile && (
                  <span className="icon">
                    <Envelope />
                  </span>
                )}
              </a>
            </div>
            <div className="header-item">
              {!isMobile && !this.props.authenticated && <Link to={`/login`}>Iniciar Sesión</Link>}
              {!isMobile && this.props.authenticated && 
                <>
                  <div className="link-button" onClick={this.handleProfile}>Hola {user.name}{user.clientName ? user.clientName != '' ? ` (${user.clientName})` : '' : ''}!</div>
                  <div className="link-button" onClick={this.handleLogOut}>Cerrar Sesión</div>
                </>}

              {/*<div {logeado_cart} className="header-dropdown mobile-hide">
              <a href="{base_url}anuncios">
                <div className="user-logged">
                  <span className="icon icon-person"></span>
                  <!-- <img
                    className="icon-user-header"
                    src="{base_url}assets/images/iconUser.svg"
                    alt="image user icon"
                  /> -->
                </div>
                Hola, {user_name_menu}!
              </a>
              <div className="header-dropdown-content-acc">
                <div className="header-dropdown-row">
                  <div className="header-dropdown-column">
                    <a href="{base_url}anuncios">Mi Cuenta</a>
                    <a href="{base_url}logout">Cerrar sesión</a>
                  </div>
                </div>
              </div>
              <!-- -->
            </div>
            <img
              {logeado_cart}
              className="mobile-hide"
              src="{base_url}assets/images/SeparadorVertical.svg"
            />
    
            <div {logeado_cart} className="menu-shopping mobile-hide">
              <a href="{base_url}miCuentaMisPedidos" className="cursor-pointer">
                Mis compras
              </a>
            </div>*/}
              {isMobile && (
                <div className="hamburguer-content">
                  <span className="icon">
                    <List />
                  </span>
                  <span className="mobile-items icon icon-close"></span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="header-search header-content content">
          <h1 className="header-item brand">
            <Link className="no-hover">
              <Image src={logo} />
            </Link>
          </h1>
          <div className="header-item fieldSearch">
            <InputGroup>
              <Form.Control
                placeholder="Buscar productos, marcas y más..." 
                value={this.state.inputValue}  // Vinculamos el valor del input al estado
                onChange={this.handleChange}
              />
              <Button variant="outline-secondary" id="button-addon1" onClick={this.handleClick}>
                <Search />
              </Button>
            </InputGroup>
          </div>
          {this.props.authenticated &&
            <Button variant="outline" onClick={this.handleCart}>
              <Cart />
              <span>({cantProdCart})</span>
            </Button>
          }

          {/* <div className="header-item shopping-cart">
            <a
              style="border: none; position: relative"
              className="cursor-pointer"
              href="{base_url}carritoCompras"
            >
              <span className="icon icon-shopping_cart"></span>

              <span id="cant_carrito" className="shopping-cant">
                ({cant})
              </span>
              <input type="hidden" id="cant_" value="{cant}" />
            </a>
          </div> */}
        </div>
        {!isMobile && <Menu />}

        {/* <div className="header-menu mobile-hide">
        <div className="header-content">
          <div className="header-item">
            <a href="{base_url}home">Inicio</a>
          </div>
          <div className="header-item">
            <div className="header-dropdown">
              <a href="{base_url}home">
                <span className="icon-menu_FILL0"></span>
                Categorías</a
              >
              <div className="header-dropdown-content">
                <!-- BEGIN menu-categoria -->
                <a {estilo_c} href="{base_url}categorias/{link_categoria}">
                  <div className="img-content">
                    <span {icon_c}></span>
                  </div>
                  {lc_categoria}</a
                >
                <!-- END menu-categoria -->
              </div>
            </div>
          </div>
          <div className="header-item">
            <a className="news" href="{base_url}tags/1-novedades">Novedades </a>
            <span className="new-in">new in</span>
          </div>
          <div className="header-item">
            <a href="{base_url}contacto">Contacto</a>
          </div>
        </div>
      </div>
      <div className="mobile-menu">
        <nav>
          <a href="{base_url}home">Inicio</a>
          <!-- BEGIN menu-mobile-categoria -->
          <a href="{base_url}categorias/{link_categoria}">{lc_categoria}</a>
          <!-- END menu-mobile-categoria -->
    
          <a href="{base_url}contacto">Contacto</a>
          <a className="news" href="{base_url}tags/1-novedades"
            >Novedades
            <span className="new-in">new in</span>
          </a>
          <div className="cuenta" {logeado_cart}>
            <a href="{base_url}miCuenta">
              <span className="icon icon-person"></span>
              <span>Mi Cuenta</span>
            </a>
          </div>
          <div className="cuenta" {logeado_sesion}>
            <a href="{base_url}login">
              <span className="icon icon-login"></span>
              <span>Iniciar sesión</span></a
            >
          </div>
          <div className="cuenta" {logeado_sesion}>
            <span>¿Todavía no tenes una cuenta?</span>
            <a href="{base_url}registro">
              <span className="icon icon-person_add"></span>
              <span>Registrate</span></a
            >
          </div>
          <div className="cuenta" {logeado_cart}>
            <a href="{base_url}logout">
              <span className="icon icon-logout"></span>
              <span>Cerrar sesión</span>
            </a>
          </div>
        </nav>
      </div>
    
      <script
        src="https://code.jquery.com/jquery-2.2.0.min.js"
        type="text/javascript"
      ></script>
      <script type="text/javascript">
        $("#submit_").click(function (e) {
          e.preventDefault();
          $.ajax({
            type: "GET",
            success: function (data) {
              let entrada = document.getElementById("busqueda_prod").value;
              if (entrada == "") {
                alert("Ingrese al menos un caracter para la búsqueda");
                document.getElementById("busqueda_prod").focus();
                return false;
              }
              let cadena = entrada.replaceAll(" ", "-");
              window.location.href = "{base_url}buscar/" + cadena;
            },
          });
        });
        let busqueda_prod = document.getElementById("busqueda_prod");
        // Execute a function when the user press a key on the keyboard
        busqueda_prod.addEventListener("keydown", function (e) {
          // Number 13 is the "Enter" key on the keyboard
          if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            let entrada = document.getElementById("busqueda_prod").value;
            if (entrada == "") {
              alert("Ingrese al menos un caracter para la búsqueda");
              document.getElementById("busqueda_prod").focus();
              return false;
            }
            let cadena = entrada.replaceAll(" ", "-");
            window.location.href = "{base_url}buscar/" + cadena;
          }
        });
      </script> */}
      </header>
    );
  }
}

export default Header;
