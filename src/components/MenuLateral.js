
import { isMobile } from "react-device-detect";

import "./MenuLateral.scss";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { PageContext } from "../services/PageContext";
import { useNavigate } from "react-router-dom";
import { GlobalFunctionsContext } from "../services/GlobalFunctionsContext";

export default function MenuLateral({categorias, catId, brandId, marcas}) {
  const { resetPages } = useContext(PageContext);
  const { convertStringToLink } = useContext(GlobalFunctionsContext);
  const navigate = useNavigate();
  
  const handleClickLink = (link) => {
    localStorage.removeItem('productoAgregado');
    resetPages();
    navigate(link);
  }

  return (
    <>
      {isMobile &&
        <>
          <input
            type="checkbox"
            id="abrir-cerrar"
            name="abrir-cerrar"
            value=""
          />
          <label for="abrir-cerrar" className="mobile-items"
            ><span className="abrir">&#9776;</span
            ><span className="cerrar">x</span></label
          > 
        </>
      }

      <div className="menu">
        {categorias.length > 0 &&
          (<div className="category-group">
            <h5>Categoría</h5>
              <div className="list-content">
                {categorias.map((c, i) => {
                  let categoria = convertStringToLink(c.nombre);
                  return brandId ?
                      (<Button variant="link"  onClick={() => {handleClickLink(`/marca/${brandId}/${c.id}-${categoria}`)}} key={`categoria_${i}`}>
                        {c.nombre} ({c.cantidad})
                      </Button>)
                      :
                      ( <Button variant="link" onClick={() => {handleClickLink(`/categoria/${c.id}-${categoria}`)}} key={`categoria_${i}`}>
                        {c.nombre} ({c.cantidad})
                      </Button>)
                  }
                )}
              </div>
          </div>)
        }
        {marcas.length > 0 &&
        (<>
            <div className="divider"></div>
            <div className="category-group">
          <h5>Marcas</h5>
          <div className="list-content">
              {marcas.map((m, i) => {
                let brand = convertStringToLink(m.nombre);
                return brandId ? 
                  (<Button variant="link" onClick={() => {handleClickLink(`/marca/${brandId}`)}} key={`marca_${i}`}>
                    {m.nombre} ({m.cantidad})
                  </Button>)
                  :
                  (<Button variant="link" onClick={() => {handleClickLink(`/categoria/${catId}/${m.id}-${brand}`)}} key={`marca_${i}`}>
                    {m.nombre} ({m.cantidad})
                  </Button>)
              })}
          </div>
        </div></>)
        }
      </div>
    </>
  )
}