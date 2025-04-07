import React, { useContext, useEffect, useState } from "react";

import "./Menu.scss";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategoryListData } from "../services/CategoryServices";
import { Button } from "react-bootstrap";
import { PageContext } from "../services/PageContext";

export default function Menu() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const { resetPages } = useContext(PageContext);
  
  const handleClickLink = (link) => {
    localStorage.removeItem('productoAgregado');
    resetPages();
    navigate(link);
  }

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
              <Button variant="link" onClick={() => {handleClickLink('/')}}>Inicio</Button>
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
                      <Button variant="link" onClick={() => {handleClickLink(`/categoria/${item.id}-${nombre}`)}}>{item.nombre}</Button>
                    )}
                    {item.submenu.length > 0 && (
                      <div className="header-dropdown">
                        <Button variant="link" onClick={() => {handleClickLink(`/categoria/${item.id}-${nombre}`)}}>{nombre}</Button>
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
                              <>
                              <Button variant="link"  className="menu"  onClick={() => {handleClickLink(`/categoria/${sub.id}-${nom}`)}}>
                                <div>{sub.nombre}</div>
                              </Button>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            <div className="header-item">
              <Button variant="link" onClick={() => {handleClickLink('/')}}>Contacto</Button>
            </div>
          </div>
        </div>
      </>
  )
}
