import { useContext, useEffect, useState } from "react";
import { GridFill, ListTask, List } from "react-bootstrap-icons";
import "./ProductosView.scss";
import { fetchProductListData } from "../services/ProductServices";
import { Link, useParams } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import { fetchBrandData } from "../services/BrandServices";
import { fetchCategoryData, fetchCategoryListData } from "../services/CategoryServices";
import ProductosComponent from "../components/productos/ProductosComponent";
import { Col, Row, FloatingLabel, FormSelect, Spinner } from "react-bootstrap";
import CustomPagination from "../components/Pagination";
import { PageContext } from "../services/PageContext";
import ProductoAgregado from "../components/productos/ProductoAgregado";
import { AuthContext } from "../services/AuthContext";

export default function BrandView() {
  const { id, catid } = useParams();
  const [viewType, setViewType] = useState("grid");
  const [productos, setProductos] = useState([]);
  const [cantProd, setCantProd] = useState(0);
  const [marcas, setMarcas ] = useState([{id: id}]) ;
  const [marcaD, setMarca] = useState({nombre: ''});
  const [categoria, setCategoria] = useState({nombre: ''});
  const [subCategorias, setSubCategorias] = useState([]);

  const [loading, setLoading] = useState(false);

  const { isAuthenticated, user } = useContext(AuthContext);
  const { currentPage, totalPages, itemsPerPage, paginate, handleLimitChange, setTotalPages, pageGroup } = useContext(PageContext);
  
  //Paginado
  /* const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1);  // Total de páginas
  const [itemsPerPage, setItemsPerPage] = useState(10); // Elementos por página (10)
 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Cambia la página
  };

  const handleLimitChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Actualizar el límite
    setCurrentPage(1); // Resetear a la primera página cuando se cambia el límite
  }; */

  useEffect(()=>{
    const params = {
      type: 'subcat',
      marca: id
    }
    setLoading(true);
    fetchCategoryListData(params)
      .then(data => {
        setSubCategorias(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(()=>{setLoading(true)});
  }, [id]);
  
  useEffect(()=>{
  /*   const params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      marca: id,
      categoria: catid ? catid : 0
    } */
    let params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      categoria: catid ? catid : 0,
      marca: id
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

    setLoading(true);
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
      .finally(()=>{setLoading(false)});

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
      .finally(()=>{setLoading(false)});

    if (catid) {
      fetchCategoryData(catid)
        .then(data => {
          setCategoria(data);
        })
        .catch(err => {console.log(err)})
      .finally(()=>{setLoading(false)});

    } else {
      setCategoria({});
      setLoading(false);
    }
  },[id, catid, currentPage, itemsPerPage]);

  return (
    <>
    {loading ?
      <div className="content-loading">
        <Spinner variant="success"/>
      </div>
      :
      <>
        <ProductoAgregado />
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
                    {pageGroup.map((item)=> {
                      return <option value={item}>{item}</option>
                    })}
                  </FormSelect>
                </FloatingLabel>
              </Col>
            </Row>
            <ProductosComponent viewType={viewType} productos={productos} authenticated={isAuthenticated} />
            <CustomPagination currentPage={currentPage} goToPage={paginate} totalPages={totalPages} />
          </div>
        </div>
      </>
    }
    </>
  );
}
