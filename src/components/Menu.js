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
                const lastChar = item.nombre[item.nombre.length - 1];
                let nombre = '';
                if (lastChar == ' ') {
                  nombre = item.nombre[item.nombre.length -1].replace(/ /g, "_")
                } else {
                  nombre = item.nombre.replace(/ /g, "_")
                }
                return (
                  <div key={`menu_${item.id}`} className="header-item">
                    {item.submenu.length === 0 && (
                      <Link to={`/categoria/${item.id}-${nombre}`}>{item.nombre}</Link>
                    )}
                    {item.submenu.length > 0 && (
                      <div className="header-dropdown">
                        <Link to={`/categoria/${item.id}-${nombre}`}>{nombre}</Link>
                        <div className="header-dropdown-content">
                          {item.submenu.map((sub) => {
                            const lastChar = sub.nombre[sub.nombre.length - 1];
                            let nom = '';
                            if (lastChar == ' ') {
                              nom = sub.nombre[sub.nombre.length -1].replace(/ /g, "_")
                            } else {
                              nom = sub.nombre.replace(/ /g, "_")
                            }
                            return (
                              <Link key={`submenu_${sub.id}`}  className="menu" to={`/categoria/${sub.id}-${nom}`}>
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
