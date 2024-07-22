import { useState } from "react";
import {
  productoTipo,
  productos,
  categorias,
  marcas,
} from "../assets/productos";
import { GridFill, ListTask, List } from "react-bootstrap-icons";
import "./ProductosView.scss";
import ProductoMini from "../components/ProductoMini";
import ProductoList from "../components/ProductList";
import Table from "react-bootstrap/Table";
export default function ProductosView() {
  const [cantProd, setCantProd] = useState(productos.length);
  const [viewType, setViewType] = useState("grid");

  return (
    <>
      <div className="category-content">
        <aside>
          {/* <input
            type="checkbox"
            id="abrir-cerrar"
            name="abrir-cerrar"
            value=""
          />
          <label for="abrir-cerrar" className="mobile-items"
            ><span className="abrir">&#9776;</span
            ><span className="cerrar">x</span></label
          > */}

          <div id="sidebar" className="sidebar">
            <div className="menu">
              <h3 className="{page_type}">Categoría</h3>
              <div className="divider"></div>
              <div className="category-menu {page_type}">
                <div className="list-content">
                  {categorias &&
                    categorias.map((c, i) => (
                      <a href={`/categorias/${i}`} key={`categoria_${i}`}>
                        <button>
                          {c.title} ({c.cant})
                        </button>
                      </a>
                    ))}
                </div>
                <h3>Marcas</h3>
                <div className="divider"></div>

                <div className="list-content">
                  {marcas &&
                    marcas.map((m, i) => (
                      <a href={`/marcas/${i}`} key={`marca_${i}`}>
                        <button>
                          {m.title} ({m.cant})
                        </button>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="category-list">
          <div className="category-title">
            <div className="breadcrumb">
              <a href="{base_url}{page_type}/{tipo_}">Escolar</a>
              {/* <span className="{page_type}">> </span>
              <a className="{page_type}">{marca}</a> */}
            </div>
            <h2 className="title">{productoTipo}</h2>
            <div className="resultados">
              <div>{cantProd} productos encontrados</div>
              <div className="view-type-content">
                <div
                  className={viewType === "grid" ? "icon  active" : "icon"}
                  onClick={() => setViewType("grid")}
                >
                  <GridFill />
                </div>
                <div
                  className={viewType === "listTask" ? "icon  active" : "icon"}
                  onClick={() => setViewType("listTask")}
                >
                  <ListTask />
                </div>
                <div
                  className={viewType === "list" ? "icon  active" : "icon"}
                  onClick={() => setViewType("list")}
                >
                  <List />
                </div>
              </div>
            </div>
          </div>
          <section class="productsItems">
            {/* {viewType != "list" && (
              <div className={viewType === "grid" ? "grid-view" : "list-view"}>
                {productos &&
                  productos.map((item) => {
                    <ProductoMini producto={item} />;
                  })}
              </div>
            )} */}
            {viewType !== "list" && (
              <div className={viewType === "grid" ? "grid-view" : "list-view"}>
                {productos &&
                  productos.map((item) => <ProductoMini producto={item} />)}
              </div>
            )}
            {/*{viewType === "listTask" && (
              <div className="list-view">
                {productos &&
                  productos.map((item) => <ProductoList producto={item} />)}
              </div>
            )}*/}
            {viewType === "list" && (
              <div className="table-view">
                <Table>
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Uni. Venta</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos &&
                      productos.map((item) => (
                        <tr>
                          <th>{item.sku}</th>
                          <th>{item.nombre}</th>
                          <th className="unVenta">{item.uniVta}</th>
                          <th>{item.precio}</th>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
