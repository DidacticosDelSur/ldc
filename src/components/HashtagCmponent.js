import { useContext, useEffect, useState } from "react";
import { fetchProductByTag } from "../services/ProductServices";
import { Image } from "react-bootstrap";
import "./HashtagComponent.scss";
import { GlobalFunctionsContext } from "../services/GlobalFunctionsContext";

export default function HashtagComponent({hashtag, title, subtitle, color,  size}) {
  const { convertStringToLink } = useContext(GlobalFunctionsContext);
  const [productos, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(()=>{
    setLoading(true);
    const params = {
      tag: hashtag,
      max: 11
    }
    fetchProductByTag(params)
    .then((data)=>{
      setProducts(data.productos)
    })
    .catch(err=>console.log(err))
    .finally(()=>{setLoading(false)});
  },[hashtag])

  return (
    <div className={`hashtag-conent ${size}`}>
      <div className="hashtag-title">
        <div className={`title ${color}`}>{title}</div>
        {size!='big' &&  <div className="subtitle">{subtitle}</div>}
      </div>
      {size == 'big' && <div className="hashtag-products"></div>}
      {productos.length > 0 &&
        productos.map((prod) => {
          let name = convertStringToLink(prod.nombre);
          return (
            <div key={`hastag_${prod.id}`} className="hashtag-products">
              <a href={`#/producto/${prod.id}-${name}`}>
                <Image src={prod.preview} />
                <div className="product-name">{prod.nombre}</div>
              </a>
            </div>
          )
        })
      }
    </div>
  )
}