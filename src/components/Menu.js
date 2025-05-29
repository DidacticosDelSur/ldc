import React, { useContext, useEffect, useMemo, useState } from "react";

import "./Menu.scss";
import { useNavigate } from "react-router-dom";
import { fetchCategoryListData } from "../services/CategoryServices";
import { Button, Dropdown } from "react-bootstrap";
import { PageContext } from "../services/PageContext";
import { GlobalFunctionsContext } from "../services/GlobalFunctionsContext";
import { ArrowBarRight, ArrowRight, ChevronRight, Mortarboard, Percent } from "react-bootstrap-icons";

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function Menu() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasRaw, setCategoriasRaw] = useState([]);
  const navigate = useNavigate();


  const { resetPages } = useContext(PageContext);
  const { convertStringToLink } = useContext(GlobalFunctionsContext);

  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const midpoint = windowHeight / 2;

      if (currentScroll < 1000) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
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
      .then(data => {
        const categoriasConChunks = data.map(item => ({
          ...item,
          submenuChunked: item.submenu.length > 0 ? chunkArray(item.submenu, 10) : [],
        }));
        setCategorias(categoriasConChunks)}
      )
      .catch(err => {console.log(err)});
  }, []);

  return (
    <>
      <div className={`menu-fixed ${showMenu ? 'translate-y-full' : 'translate-y-0 z-0'}`}>
        <div className="menu">
          <div className="menu-tags">{/*Iria los tags*/}
            <Button className="pink"><Percent /> Descuentos</Button>
            <Button className="blue"><Mortarboard /> Escolar</Button>
          </div>
          <div className="menu-content">
            {categorias &&
              categorias.map((item) => {
                let nombre = convertStringToLink(item.nombre);
                return (
                  <>
                    <div className="item">
                      <div key={`menu_${item.id}`} className={`menu-content-item ${item.submenu.length > 0 ? 'p-0' : ''}`}>
                      {item.submenu.length === 0 && (
                        <Button variant="link" onClick={() => {handleClickLink(`/categoria/${item.id}-${nombre}`)}}>{item.nombre}</Button>
                      )}
                      {item.submenu.length > 0 && (
                        <>
                          <Dropdown>
                            <Dropdown.Toggle>
                              {nombre}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <div className="menu-dropdown-content">
                                <div className="menu-title-content">
                                  <Dropdown.ItemText className="title-content">
                                      <div className="title">{nombre}</div>
                                      <div className="button-dropdown">
                                        <Dropdown.Item onClick={() => {handleClickLink(`/categoria/${item.id}-${nombre}`)}}>Ver todos los productos</Dropdown.Item>
                                        <div className="icon">
                                          <ArrowRight />
                                        </div>
                                      </div>
                                  </Dropdown.ItemText>
                                </div>
                                <div className="menu-data-content">
                                {item.submenuChunked && item.submenuChunked.map((chunk, idx) => (
                                  <div className="menu-data-list" key={`submenu_chunk_${idx}`}>
                                    {chunk.map((sub) => (
                                      <Dropdown.Item className="list-item" key={`button_${sub.id}`} onClick={() => {handleClickLink(`/categoria/${sub.id}-${convertStringToLink(sub.nombre)}`)}}>
                                        {sub.nombre}
                                        <ChevronRight />
                                      </Dropdown.Item>
                                    ))}
                                  </div>
                                ))}
                                </div>
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                      </>
                      )}
                    </div>
                    </div>
                    |
                  </>
                );
              })}
            <div className="menu-content-item">
              <Button variant="link" onClick={() => {handleClickLink('/')}}>Contacto</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
