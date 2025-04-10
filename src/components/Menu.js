import React, { useContext, useEffect, useState } from "react";

import "./Menu.scss";
import { useNavigate } from "react-router-dom";
import { fetchCategoryListData } from "../services/CategoryServices";
import { Button } from "react-bootstrap";
import { PageContext } from "../services/PageContext";
import { GlobalFunctionsContext } from "../services/GlobalFunctionsContext";

export default function Menu() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const { resetPages } = useContext(PageContext);
  const { convertStringToLink } = useContext(GlobalFunctionsContext);
  
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
                let nombre = convertStringToLink(item.nombre);
                return (
                  <div key={`menu_${item.id}`} className="header-item">
                    {item.submenu.length === 0 && (
                      <Button variant="link" onClick={() => {handleClickLink(`/categoria/${item.id}-${nombre}`)}}>{item.nombre}</Button>
                    )}
                    {item.submenu.length > 0 && (
                      <div className="header-dropdown" key={`menuDrop_${item.id}`}>
                        <Button variant="link" onClick={() => {handleClickLink(`/categoria/${item.id}-${nombre}`)}}>{nombre}</Button>
                        <div className="header-dropdown-content">
                          {item.submenu.map((sub) => {
                            let name = convertStringToLink(sub.nombre);
                            return (
                              <>
                              <Button key={`button_${sub.id}`} variant="link"  className="menu"  onClick={() => {handleClickLink(`/categoria/${sub.id}-${name}`)}}>
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
