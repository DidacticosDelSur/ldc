import { useContext, useEffect, useState } from "react";
import { GridFill, ListTask, List } from "react-bootstrap-icons";
import "./ProductosView.scss";
import { fetchProductListData } from "../services/ProductServices";
import { useParams } from "react-router-dom";
import ProductosComponent from "../components/productos/ProductsComponent";
import { Col, FloatingLabel, FormSelect, Row, Spinner } from "react-bootstrap";
import CustomPagination from "../components/Pagination";
import { AuthContext } from "../services/AuthContext";
import { PageContext } from "../services/PageContext";

export default function SearchView({save = true}) {
  const { searchTerm } = useParams();
  const [viewType, setViewType] = useState("grid");
  const [productos, setProductos] = useState([]);
  const [cantProd, setCantProd] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const { isAuthenticated, user } = useContext(AuthContext);
  const { currentPage, totalPages, itemsPerPage, paginate, handleLimitChange, setTotalPages, pageGroup } = useContext(PageContext);
  

  useEffect(()=>{
    let params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      search: searchTerm,
      save: save
    };
    if (user) {
      params = {
        ...params,
        user: user.id,
        isSeller: user.isSeller,
      }
      if (user.isSeller && (user.clientSelected && user.clientSelected != 0)) {
        params = {
          ...params,
          clientId: user.clientSelected
        }
      }
    }
    setLoading(true);
    fetchProductListData(params)
      .then(data => {
        setProductos(data.productos);
        setCantProd(data.productos.length);
        setTotalPages(data.totalPages);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(()=>{setLoading(false)})
  },[searchTerm, currentPage, itemsPerPage]);

  useEffect(() => {
    const el = document.getElementById(sessionStorage.getItem('idProductos'));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" }); // animación suave
    } else {
      window.scrollTo(0,0)
    }
  }, [productos]);

  return (
    <>
      {loading ?
        <div className="content-loading">
          <Spinner variant="success" />
        </div>
        :
        <div className="category-content">
          <div className="category-list">
            <div className="category-title">
              <h2 className="title">Resultado de la búsqueda</h2>
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
                    className={viewType === "list" ? "icon  active" : "icon"}
                    onClick={() => setViewType("list")}
                  >
                    <List />
                  </div>
                </div>
              </div>
            </div>
            <Row>
              <Col md={2} className='mb-2'>
                <FloatingLabel controlId="flotingSelect" label="Cant. por pag.">
                  <FormSelect id="limit" value={itemsPerPage} onChange={handleLimitChange}>
                    {pageGroup.map((item)=> {
                      return <option value={item} key={`option_${item}`}>{item}</option>
                    })}
                  </FormSelect>
                </FloatingLabel>
              </Col>
            </Row>
            <ProductosComponent viewType={viewType} products={productos} authenticated={isAuthenticated}/>
            <CustomPagination currentPage={currentPage} goToPage={paginate} totalPages={totalPages} />
          </div>
        </div>
      }
    </>
  );
}
