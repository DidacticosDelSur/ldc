import { useContext, useEffect, useState } from "react";
import { GridFill, ListTask, List } from "react-bootstrap-icons";
import "./ProductosView.scss";
import { fetchProductListData } from "../services/ProductServices";
import { Link, useParams } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import { fetchBrandData } from "../services/BrandServices";
import { fetchCategoryData, fetchCategoryListData } from "../services/CategoryServices";
import ProductosComponent from "../components/productos/ProductsComponent";
import { Col, Row, FloatingLabel, FormSelect, Spinner } from "react-bootstrap";
import CustomPagination from "../components/Pagination";
import { PageContext } from "../services/PageContext";
import ProductoAgregado from "../components/productos/ProductoAgregado";
import { AuthContext } from "../services/AuthContext";
import CatalogView from "./CatalogView";

export default function BrandView() {
  const { brandInfo, categoryInfo } = useParams();
  const [brandId, ...brandNameParts] = brandInfo.split('-');
  const [categoryId, ...categoryNameParts] =categoryInfo ? categoryInfo.split('-') : [null, []];

  return (
      <CatalogView
        categoryInfo={categoryInfo}
        brandInfo={brandInfo}
      ></CatalogView>)
}
