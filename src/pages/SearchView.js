import { useContext, useEffect, useState } from "react";
import { GridFill, ListTask, List } from "react-bootstrap-icons";
import "./ProductosView.scss";
import { fetchProductListData } from "../services/ProductServices";
import { Link, useParams } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import { fetchBrandData, fetchBrandListData } from "../services/BrandServices";
import { fetchCategoryData, fetchCategoryListData } from "../services/CategoryServices";
import ProductosComponent from "../components/productos/ProductosComponent";
import { Col, FloatingLabel, FormSelect, Row } from "react-bootstrap";
import CustomPagination from "../components/Pagination";
import { AuthContext } from "../services/AuthContext";

export default function SearchView() {
  const { searchTerm } = useParams();
  const [viewType, setViewType] = useState("grid");
  const [productos, setProductos] = useState([]);
  const [cantProd, setCantProd] = useState(0);
  //const [marcas, setMarcas ] = useState([]) ;
  //const [categoria, setCategoria] = useState({nombre: ''});
  //const [marcaD, setMarca] = useState({nombre: ''});
  //const [subCategorias, setSubCategorias] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  

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

  useEffect(()=>{
    const params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      search: searchTerm 
      /*cat: id,
      marca: marca ? marca : 0*/
    };
    fetchProductListData(params)
      .then(data => {
        setProductos(data.productos);
        setCantProd(data.productos.length);
        setTotalPages(data.totalPages);
      })
      .catch(err => {
        console.log(err);
      })
    /* fetchCategoryData(id)
      .then(data => {
        setCategoria(data);
      })
      .catch(err => {
        console.log(err);
      })
    fetchCategoryListData({type: 'subcat', cat: id})
      .then(data => {
        setSubCategorias(data);
      })
      .catch(err=>{
        console.log(err);
      })
    fetchBrandListData({cat: id})
      .then(data => {
        setMarcas(data);
      })
      .catch(err => {
        console.log(err);
      })
    if (marca) {
      fetchBrandData(marca)
      .then(data => {
        setMarca(data);
      })
    } */
  },[searchTerm, currentPage, itemsPerPage]);

  return (
    <>
      <div className="category-content">
        {/* <MenuLateral cat_id={id} categorias={subCategorias} marcas={marcas} /> */}
        <div className="category-list">
          <div className="category-title">
            {/* <div className="breadcrumb">
              <Link to={`/categoria/${id}`}>{categoria.nombre}</Link>
              <span>&nbsp;{' >' }&nbsp;</span>
              <a>{marcaD.nombre}</a> 
            </div> */}
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
