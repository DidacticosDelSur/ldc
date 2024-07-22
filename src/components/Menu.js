import React, { Component } from "react";

import "./Menu.scss";
import { Link } from "react-router-dom";
import { categorias } from "../assets/categorias";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
class Menu extends Component {
  render() {
    return (
      <>
        <div className="header-menu mobile-hide">
          <div className="header-content">
            <div className="header-item">
              <Link to="/">Inicio</Link>
            </div>

            {categorias &&
              categorias.map((item) => {
                return (
                  <div className="header-item">
                    {item.subcategorias.length === 0 && (
                      <Link to={item.url}>{item.nombre}</Link>
                    )}
                    {item.subcategorias.length > 0 && (
                      <div className="header-dropdown">
                        <Link to={item.url}>{item.nombre}</Link>
                        <div className="header-dropdown-content">
                          {item.subcategorias.map((sub) => {
                            return (
                              <Link className="menu" to={sub.url}>
                                <div>{sub.nombre}</div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

            {/* <div className="header-item">
              <div className="header-dropdown">
                <a href="{base_url}home">
                  <span className="icon-menu_FILL0"></span>
                  Categorías
                </a>
                <div className="header-dropdown-content">
                  <a href="{base_url}categorias/{link_categoria}">
                    <div className="img-content">
                      <span></span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="header-item">
              <a className="news" href="{base_url}tags/1-novedades">
                Novedades{" "}
              </a>
              <span className="new-in">new in</span>
            </div> */}
            <div className="header-item">
              <a href="{base_url}contacto">Contacto</a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Menu;
