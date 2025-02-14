import { useEffect, useState } from "react";
import { GridFill, ListTask, List } from "react-bootstrap-icons";
import "./ProductosView.scss";
import { fetchProductListData } from "../services/ProductServices";
import { Link, useParams } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import { fetchBrandData } from "../services/BrandServices";
import { fetchCategoryData, fetchCategoryListData } from "../services/CategoryServices";
import ProductosComponent from "../components/productos/ProductosComponent";
import { Col, Row, FloatingLabel, FormSelect } from "react-bootstrap";
import CustomPagination from "../components/Pagination";

export default function BrandView() {
  const { id, catid } = useParams();
  const [viewType, setViewType] = useState("grid");
  const [productos, setProductos] = useState([]);
  const [cantProd, setCantProd] = useState(0);
  const [marcas, setMarcas ] = useState([{id: id}]) ;
  const [marcaD, setMarca] = useState({nombre: ''});
  const [categoria, setCategoria] = useState({nombre: ''});
  const [subCategorias, setSubCategorias] = useState([]);

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
      type: 'subcat',
      marca: id
    }
    fetchCategoryListData(params)
      .then(data => {
        setSubCategorias(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [id]);
  
  useEffect(()=>{
    const params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      marca: id,
      categoria: catid ? catid : 0
    }
    fetchProductListData(params)
      .then(data => {
        setProductos(data.productos);
        setCantProd(data.productos.length);
        setTotalPages(data.totalPages);
        setMarcas(prevItems =>
          prevItems.map(item =>
            item.id === id ? { ...item, cantidad: data.productos.length } : item
          )
        )
      })
      .catch(err => {
        console.log(err);
      })
    fetchBrandData(id)
      .then(data => {
        setMarca(data);
        setMarcas(prevItems =>
          prevItems.map(item =>
            item.id === id ? { ...item, nombre: data.nombre } : item
          )
        )
      })
      .catch(err=>{
        console.log(err);
      })
    if (catid) {
      fetchCategoryData(catid)
        .then(data => {
          setCategoria(data);
        })
        .catch(err => {console.log(err)}) 
    } else {
      setCategoria({})
    }
  },[id, catid, currentPage, itemsPerPage]);

  return (
    <>
      <div className="category-content">
        <MenuLateral cat_id={id} categorias={subCategorias} marcas={marcas} marcaId={id}/>
        <div className="category-list">
          <div className="category-title">
            <div className="breadcrumb">
              <Link to={`/marca/${marcaD.id}`}>{marcaD.nombre}</Link>
              { catid && (
                <>
                <span>&nbsp;{' >' }&nbsp;</span>
                <a>{categoria.nombre}</a>
                </>
              )}
            </div>
            <h2 className="title">{marcaD.nombre}</h2>
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
          <ProductosComponent viewType={viewType} productos={productos} />
          <CustomPagination currentPage={currentPage} goToPage={paginate} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
