
import { isMobile } from "react-device-detect";

import "./MenuLateral.scss";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { PageContext } from "../services/PageContext";
import { useNavigate } from "react-router-dom";

export default function MenuLateral({categorias, cat_id, marcaId, marcas}) {
  const { resetPages } = useContext(PageContext);
  const navigate = useNavigate();
  
  const handleClickLink = (link) => {
    localStorage.removeItem('productoAgregado');
    resetPages();
    navigate(link);
  }

  return (
    <aside>
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

      <div id="sidebar" className="sidebar">
        <div className="menu">
          {categorias.length > 0 &&
            (<>
              <h3>Categoría</h3>
              <div className="divider"></div>
              {/* <div className="category-menu"> */}
                <div className="list-content">
                    {categorias.map((c, i) =>
                      marcaId ?
                      <Button variant="link"  onClick={() => {handleClickLink(`/marca/${marcaId}/${c.id}`)}} key={`categoria_${i}`}>
                        {c.nombre} ({c.cantidad})
                      </Button>
                      :
                      <Button variant="link" onClick={() => {handleClickLink(`/categoria/${c.id}-${c.nombre}`)}} key={`categoria_${i}`}>
                        {c.nombre} ({c.cantidad})
                      </Button>
                    )}
                </div>
              {/* </div> */}
            </>)
          }
          {marcas.length > 0 &&
          (<>
            <h3>Marcas</h3>
            <div className="divider"></div>
            <div className="list-content">
                {marcas.map((m, i) => 
                  marcaId ? 
                  <Button variant="link" onClick={() => {handleClickLink(`/marca/${m.id}`)}} key={`marca_${i}`}>
                    {m.nombre} ({m.cantidad})
                  </Button>
                  :
                  <Button variant="link" onClick={() => {handleClickLink(`/categoria/${cat_id}/${m.id}-${m.nombre}`)}} key={`marca_${i}`}>
                    {m.nombre} ({m.cantidad})
                  </Button>
                )}
            </div>
          </>)
          }
          {/* </div> */}
        </div>
      </div>
    </aside>
  )
}