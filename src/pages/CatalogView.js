import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { PageContext } from "../services/PageContext";
import { fetchProductListData } from "../services/ProductServices";
import { fetchCategoryListData } from "../services/CategoryServices";
import { fetchBrandListData } from "../services/BrandServices";
import MenuLateral from "../components/MenuLateral";
import { GridFill, List, ListTask } from "react-bootstrap-icons";
import { Col, FloatingLabel, FormSelect, Row, Spinner } from "react-bootstrap";
import ProductoAgregado from "../components/productos/ProductoAgregado";
import ProductsComponent from "../components/productos/ProductsComponent";
import CustomPagination from "../components/Pagination";
import { Link, useParams } from "react-router-dom";

export default function CatalogView() {
  const { brandInfo, categoryInfo } = useParams();

  const [viewType, setViewType] = useState(sessionStorage.getItem("viewType") ? sessionStorage.getItem("viewType") : "grid");
  const [categoryId, ...categoryNameParts] = categoryInfo ? categoryInfo.split('-')  : [null, []];
  const categoryName = categoryNameParts.join(' ');

  const [brandId, ...brandNameParts] = brandInfo ? brandInfo.split('-') : [null, []];
  const brandName = brandNameParts.join(' ');

  const [productos, setProductos] = useState([]);
  const [cantProd, setCantProd] = useState(0);
  const [marcas, setMarcas ] = useState([]) ;

  const [subCategorias, setSubCategorias] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);

  const { currentPage, totalPages, itemsPerPage, paginate, handleLimitChange, setTotalPages, pageGroup } = useContext(PageContext);
  const [ loading, setLoading ] = useState(false);

  const handleViewChange = (view) => {
    setViewType(view);
    sessionStorage.setItem('viewType', view);
  }

  useEffect(()=>{
    let params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      categoria: categoryId ? categoryId : 0,
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
      .finally(()=>{setLoading(false)});

    let catParams = {
      type: 'lateral',
    }
    let brandParams = {
      type: 'lateral',
    }
    if (categoryId) {
      catParams = {
        ...catParams,
        cat: categoryId
      }
      brandParams = {
        ...brandParams,
        cat: categoryId
      }
    }
    if (brandId) {
      catParams = {
        ...catParams,
        marca: brandId
      }
      brandParams = {
        ...brandParams,
        marca: brandId
      }
    }
    fetchCategoryListData(catParams)
      .then(data => {
        setSubCategorias(data);
      })
      .catch(err=>{
        console.log(err);
      })
      .finally(()=>{setLoading(false)});

    fetchBrandListData(brandParams)
      .then(data => {
        setMarcas(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(()=>{setLoading(false)});

  },[categoryId, brandId, currentPage, itemsPerPage]);

  return (
    <>
      {loading ?
        <div className="content-loading">
          <Spinner variant="success" />
        </div>
        :
        <>
          <ProductoAgregado />
          <div className="category-content">
            <MenuLateral catId={categoryInfo} categorias={subCategorias} marcas={marcas} brandId={brandInfo}/>
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
                      {pageGroup.map((item)=> {
                        return <option value={item} key={`limit_${item}`}>{item}</option>
                      })}
                    </FormSelect>
                  </FloatingLabel>
                </Col>
              </Row>
              <ProductsComponent viewType={viewType} products={productos}/>
              <CustomPagination currentPage={currentPage} goToPage={paginate} totalPages={totalPages} />
            </div>
          </div>
        </>
      }
    </>
  );
}