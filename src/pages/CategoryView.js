import { useContext, useEffect, useState } from "react";
import { GridFill, ListTask, List } from "react-bootstrap-icons";
import "./ProductosView.scss";
import { fetchProductListData } from "../services/ProductServices";
import { Link, useParams } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import { fetchBrandListData } from "../services/BrandServices";
import { fetchCategoryListData } from "../services/CategoryServices";
import ProductosComponent from "../components/productos/ProductosComponent";
import { Col, FloatingLabel, FormSelect, Row } from "react-bootstrap";
import CustomPagination from "../components/Pagination";
import { AuthContext } from "../services/AuthContext";

export default function CategoryView() {
  const { categoryInfo, brandInfo } = useParams();
  const [categoryId, ...categoryNameParts] = categoryInfo.split('-');
  const categoryName = categoryNameParts.join(' ').replace(/_/g, " "); // Unir de nuevo el nombre del producto (en caso de que tenga más de una palabra)

  const [brandId, ...brandNameParts] = brandInfo ? brandInfo.split('-') : [null, []];
  const brandName = brandNameParts.join(' ').replace(/_/g, " ");
  
  const [viewType, setViewType] = useState(sessionStorage.getItem("viewType") ? sessionStorage.getItem("viewType") : "grid");
  const [productos, setProductos] = useState([]);
  const [cantProd, setCantProd] = useState(0);
  const [marcas, setMarcas ] = useState([]) ;
  const [subCategorias, setSubCategorias] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1);  // Total de páginas
  const [itemsPerPage, setItemsPerPage] = useState(10); // Elementos por página (10)
 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Cambia la página
  };

  const handleLimitChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Actualizar el límite
    setCurrentPage(1); // Resetear a la primera página cuando se cambia el límite
  };

  const handleViewChange = (view) => {
    setViewType(view);
    sessionStorage.setItem('viewType', view);
  }

  useEffect(()=>{
    let params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      categoria: categoryId,
      marca: brandId ? brandId : 0,
    }
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
    fetchProductListData(params)
      .then(data => {
        setProductos(data.productos);
        setCantProd(data.productos.length);
        setTotalPages(data.totalPages);
      })
      .catch(err => {
        console.log(err);
      })
    fetchCategoryListData({type: 'subcat', cat: categoryId})
      .then(data => {
        setSubCategorias(data);
      })
      .catch(err=>{
        console.log(err);
      })
    fetchBrandListData({cat: categoryId})
      .then(data => {
        setMarcas(data);
      })
      .catch(err => {
        console.log(err);
      })
  },[categoryId, brandId, currentPage, itemsPerPage]);

  return (
    <>
      <div className="category-content">
        <MenuLateral cat_id={categoryInfo} categorias={subCategorias} marcas={marcas} />
        <div className="category-list">
          <div className="category-title">
            <div className="breadcrumb">
              <Link to={`/categoria/${categoryInfo}`}>{categoryName}</Link>
              {brandName && 
                <>
                  <span>&nbsp;{' >' }&nbsp;</span>
                  <a>{brandName}</a> 
                </>
              }
            </div>
            <h2 className="title">{categoryName}</h2>
            <div className="resultados">
              <div>{cantProd} productos encontrados</div>
              <div className="view-type-content">
                <div
                  className={viewType === "grid" ? "icon  active" : "icon"}
                  onClick={() => handleViewChange("grid")}
                >
                  <GridFill />
                </div>
                <div
                  className={viewType === "listTask" ? "icon  active" : "icon"}
                  onClick={() => handleViewChange("listTask")}
                >
                  <ListTask />
                </div>
                <div
                  className={viewType === "list" ? "icon  active" : "icon"}
                  onClick={() => handleViewChange("list")}
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
                  <option value={1}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </FormSelect>
              </FloatingLabel>
            </Col>
          </Row>
          <ProductosComponent viewType={viewType} productos={productos} authenticated={isAuthenticated}/>
          <CustomPagination currentPage={currentPage} goToPage={paginate} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
