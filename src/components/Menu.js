import React, { useEffect, useState } from "react";

import "./Menu.scss";
import { Link } from "react-router-dom";
import { fetchCategoryListData } from "../services/CategoryServices";

export default function Menu() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const params = {
      type: 'menu'
    }
    fetchCategoryListData(params)
      .then(data => {setCategorias(data)})
      .catch(err => {console.log(err)});
  }, []);

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
                  <div key={`menu_${item.id}`} className="header-item">
                    {item.submenu.length === 0 && (
                      <Link to={`/categoria/${item.id}`}>{item.nombre}</Link>
                    )}
                    {item.submenu.length > 0 && (
                      <div className="header-dropdown">
                        <Link to={`/categoria/${item.id}`}>{item.nombre}</Link>
                        <div className="header-dropdown-content">
                          {item.submenu.map((sub) => {
                            return (
                              <Link key={`submenu_${sub.id}`}  className="menu" to={`/categoria/${sub.id}`}>
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
            <div className="header-item">
              <a href="/">Contacto</a>
            </div>
          </div>
        </div>
      </>
  )
}
