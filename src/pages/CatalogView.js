import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { PageContext } from "../services/PageContext";
import { fetchProductListData } from "../services/ProductServices";
import { fetchCategoryData, fetchCategoryListData } from "../services/CategoryServices";
import { fetchBrandData, fetchBrandListData } from "../services/BrandServices";
import MenuLateral from "../components/MenuLateral";
import { GridFill, List, ListTask } from "react-bootstrap-icons";
import { FloatingLabel, FormLabel, FormSelect, Spinner } from "react-bootstrap";
import ProductoAgregado from "../components/productos/ProductoAgregado";
import ProductsComponent from "../components/productos/ProductsComponent";
import CustomPagination from "../components/Pagination";
import { Link, useParams } from "react-router-dom";
import './CatalogView.scss';
import { fetchTagData } from "../services/TagServices";

export default function CatalogView() {
  const { brandInfo, categoryInfo, tagInfo } = useParams();

  const [viewType, setViewType] = useState(sessionStorage.getItem("viewType") ? sessionStorage.getItem("viewType") : "grid");
  const [categoryId, ...categoryNameParts] = categoryInfo ? categoryInfo.split('-')  : [null, []];
  const categoryName = categoryNameParts.join(' ');

  const [brandId, ...brandNameParts] = brandInfo ? brandInfo.split('-') : [null, []];
  const brandName = brandNameParts.join(' ');

  const [tagId, ...tagNameParts] = tagInfo ? tagInfo.split('-') : [null, []];
  const tagName = tagNameParts.join(' ');

  const catalogName = categoryInfo ? categoryName : brandInfo ? brandName : tagName;
  const [catalogData, setCatalogData] = useState({backgroundUrl: ''});

  const [productos, setProductos] = useState([]);
  const [cantProd, setCantProd] = useState(0);
  const [marcas, setMarcas ] = useState([]) ;

  const [subCategorias, setSubCategorias] = useState([]);
  const { user } = useContext(AuthContext);

  const { currentPage, totalPages, itemsPerPage, paginate, handleLimitChange, setTotalPages, pageGroup } = useContext(PageContext);
  const [ loading, setLoading ] = useState(false);
  const [showLateral, setShowLateral] = useState(true);

  const handleViewChange = (view) => {
    setViewType(view);
    sessionStorage.setItem('viewType', view);
  }

  useEffect(()=>{
    setShowLateral(true);
    let params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      categoria: categoryId ? categoryId : 0,
      marca: brandId ? brandId : 0,
      tag: tagId ? tagId : 0,
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
      fetchCategoryData(categoryId)
      .then(data=> {
        setCatalogData(data);
      })
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
      fetchBrandData(brandId)
      .then(data=> {
        setCatalogData(data);
      })
    }
    if (tagId) {
      setShowLateral(false);
      fetchTagData(tagId)
      .then((data) => {
        setCatalogData(data);
      })
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

  },[categoryId, brandId, tagId, currentPage, itemsPerPage]);

  return (
    <>
      {loading ?
        <div className="content-loading">
          <Spinner variant="success" />
        </div>
        :
        <>
          <ProductoAgregado />
          <div className="catalog-header"
                style={{backgroundImage: catalogData.showBackground ? `url("${catalogData.backgroundUrl}")` : ''}}>
            <div className="breadcrumb">
              {categoryInfo
                ?<>
                    <Link to={`/categoria/${categoryInfo}`}>{catalogName}</Link>
                    {brandName && <>
                      <span>&nbsp;{' >' }&nbsp;</span>
                      <a>{brandName}</a>
                    </>
                    }
                  </>
                : brandInfo
                  ? <Link to={`/marca/${brandInfo}`}>{catalogName}</Link>
                  : <Link to={`/tags/${brandInfo}`}>{catalogName}</Link>
              }
            </div>
            <div className="header-content">
              <div className="header-title">
                <div className="title">
                  {catalogName}
                </div>
                <div className="subtitle">
                  {catalogData.descripcion}
                </div>
              </div>
              <div className="header-subcategories"></div>
            </div>
          </div>
          <div className="catalog-content">
            {showLateral &&
              <div className="catalog-filter">
                <MenuLateral catId={categoryInfo} categorias={subCategorias} marcas={marcas} brandId={brandInfo}/>
              </div>
            }
            <div className="catalog-list">
              <div className="category-list-header">
                <div className="category-list-header-title"> 
                  <h4 className="title">{catalogName}</h4>
                  <div className="subtitle">({cantProd} productos encontrados)</div>
                </div>
                <div className="category-list-header-data">
                  <div>
                    <label>Cant. por Pag.</label>
                    <FormSelect id="limit" value={itemsPerPage} onChange={handleLimitChange}>
                      {pageGroup.map((item)=> {
                        return <option value={item} key={`limit_${item}`}>{item}</option>
                      })}
                    </FormSelect>
                  </div>
                  <div className="view-type-content">
                    Vista:
                    <div
                      className={viewType === "grid" ? "icon  active" : "icon"}
                      onClick={() => handleViewChange("grid")}
                    >
                      <GridFill />
                    </div>
                    {/* <div
                      className={viewType === "listTask" ? "icon  active" : "icon"}
                      onClick={() => handleViewChange("listTask")}
                    >
                      <ListTask />
                    </div> */}
                    <div
                      className={viewType === "list" ? "icon  active" : "icon"}
                      onClick={() => handleViewChange("list")}
                    >
                      <List />
                    </div>
                  </div>
                </div>
              </div>
              <div className="catalog-content-items">
                <ProductsComponent viewType={viewType} products={productos}/>
              </div>
              <CustomPagination currentPage={currentPage} goToPage={paginate} totalPages={totalPages} />
            </div>
          </div>
        </>
      }
    </>
  );
}