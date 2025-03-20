
import { Component } from "react";
import { isMobile } from "react-device-detect";

import "./MenuLateral.scss";
import { Link } from "react-router-dom";

class MenuLateral extends Component {
  render() {
    return (
      <>
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
              {this.props.categorias.length > 0 &&
                (<>
                  <h3>Categoría</h3>
                  <div className="divider"></div>
                  {/* <div className="category-menu"> */}
                    <div className="list-content">
                        {this.props.categorias.map((c, i) => (
                          this.props.marcaId ?
                          (
                            <Link to={`/marca/${this.props.marcaId}/${c.id}`} key={`categoria_${i}`}>
                              <button>{c.nombre} ({c.cantidad})</button>
                            </Link>
                          ) : (
                            <Link to={`/categoria/${c.id}-${c.nombre}`} key={`categoria_${i}`}>
                              <button>{c.nombre} ({c.cantidad})</button>
                            </Link>
                          )
                        ))}
                    </div>
                  {/* </div> */}
                </>)
              }
              {this.props.marcas.length > 0 &&
              (<>
                <h3>Marcas</h3>
                <div className="divider"></div>
                <div className="list-content">
                    {this.props.marcas.map((m, i) => (
                      this.props.marcaId ? 
                      <Link to={`/marca/${m.id}`} key={`marca_${i}`}>
                        <button>{m.nombre} ({m.cantidad})</button>
                      </Link> :
                      <Link to={`/categoria/${this.props.cat_id}/${m.id}-${m.nombre}`} key={`marca_${i}`}>
                        <button>{m.nombre} ({m.cantidad})</button>
                      </Link>
                    ))}
                </div>
              </>)
              }
              {/* </div> */}
            </div>
          </div>
        </aside>
      </>
    );
  }
}

export default MenuLateral; 
