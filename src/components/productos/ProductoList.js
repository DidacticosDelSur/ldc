import ProductSmall from "./ProductSmall";

export default function ProductList({title, itmes}){
  return(
    <div className="catalog-product-content">
      <div className="title-header">
        <div className="title-text-content">
          <div className="title-text large">{title}</div>
        </div>
        <div className="title-border-rounded"></div>
      </div>
      <div className="catalog-product-list">
        {itmes &&
          itmes.map((item) => <ProductSmall key={`producto_${item.id}`} product={item}/>)}
      </div>
    </div>
  )
}