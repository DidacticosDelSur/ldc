import { useContext, useEffect, useRef, useState } from "react";
import './Producto.scss';
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";
import SliderComponent from "../SliderComponent";
import { ArrowLeft, Box, Boxes, Cart, Clock } from "react-bootstrap-icons";
import { AuthContext } from "../../services/AuthContext";
import '../../assets/scss/Table.scss';
import { Percent, Tv } from "lucide-react";

export default function Producto({prod, onVisible, onMessage, onAddItemToCart, onKeepShopping, cartSelected}) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { formatCurrency, convertStringToLink } = useContext(GlobalFunctionsContext);
  const [productData, setProductData] = useState({minimo_compra: 0, cantidad: 0, variaciones: []});
  const [fixed, setFixed] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(()=>{
    let variations = [];
    const dto = !user.disc_visib ? user.discount : 0;
    prod.variaciones.map((item => {
      variations.push({
        id: item.id,
        nombre: item.nombre,
        precio: (item.precio ? item.precio : prod.precio) * (1-dto/100),
        cantidad: 0,
        subtotal: 0,
        inCart: item.inCart ? item.inCart : 0,
        descuento: item.descuento ? item.descuento : prod.descuento,
        stock: item.stock ? item.stock : -1
      })
    }))

    setProductData({
      nombre: prod.nombre,
      alicuota: prod.alicuota ? prod.alicuota : 1.21,
      stock: prod.stock,
      precio: prod.precio * (1 - dto/100),
      descuento: prod.descuento ? prod.descuento : 0,
      cantidad: variations.length > 0
        ? 0
        : prod.inCart
          ? 0
          : prod.minimo_compra
            ? prod.minimo_compra
            : 1,
      variaciones: variations,
      subtotal: variations.length > 0
        ? 0
        : prod.inCart
          ? 0
          : prod.minimo_compra
            ? prod.minimo_compra * (prod.precio * (1-dto/100) * (1 - prod.descuento/100))
            : prod.precio * (1-dto/100) * (1 - prod.descuento/100)
        ,
      canAddtoCart: user
        ? cartSelected
          ? variations.length > 0
            ? !variations.every((variation) => variation.cantidad == 0)
            : prod.stock >= prod.minimo_compra
          : false
        : false,
      minimo_compra: prod.minimo_compra
        ? prod.minimo_compra != 0
          ? prod.minimo_compra
          : 1
        : 1,
      inCart: prod.inCart ? prod.inCart : 0
    })
  },[prod]);
  useEffect(()=>{
    setHeight(ref.current.clientHeight)
    const handleScroll = () => {
      const triggerHeight = 500; // cambia este valor según el punto deseado
      const scrollY = window.scrollY;

      setScrolledPast(scrollY > triggerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  },[])

  /* useEffect(() => {
    const onScroll = () => {
      setFixed(window.scrollY < height/2);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [height]); */

  const handleDecrement = (i=-1) => {
    onVisible(false);
    let newVariations = [...productData.variaciones];
    let newAmount = productData.cantidad;
    let newPrice = productData.precio;
    let subtotal = productData.subtotal;
    const newStock = i != -1 ? newVariations[i].stock : productData.stock;
    
    const addToCart = i != -1
      ? newVariations.every((variation) => variation.cantidad == 0)
      : (productData.cantidad - productData.minimo_compra != 0);

    if (i != -1) {
      newAmount = newVariations[i].cantidad - productData.minimo_compra;
      newVariations[i].cantidad = newAmount;
      newPrice = newVariations[i].precio*(1-newVariations[i].descuento/100);
      newVariations[i].subtotal = newVariations[i].cantidad*newPrice;
    } else {
      newAmount -= productData.minimo_compra;
      newPrice = productData.precio * (1 -productData.descuento / 100);
    }
    subtotal -= productData.minimo_compra * newPrice;
    setProductData((prevData) => ({
      ...prevData,
      variaciones: newVariations,
      cantidad: newAmount,
      subtotal: subtotal,
      canAddtoCart: cartSelected ? addToCart : false
    }));

    if ((newStock != -1) && (newStock < newAmount)) {
      onMessage('¡No hay suficiente stock!');
      onVisible(true);
    }
  };

  const handleIncrement = (i=-1) => {
    let newVariations = [...productData.variaciones];
    let newAmount = productData.cantidad;
    let newPrice = productData.precio;
    let subtotal = productData.subtotal;
    const newStock = i != -1 ? newVariations[i].stock : productData.stock;

    if (i!=-1) {
      newAmount = newVariations[i].cantidad + productData.minimo_compra;
      newVariations[i].cantidad = newAmount;
      newPrice = newVariations[i].precio*(1-newVariations[i].descuento/100);
      newVariations[i].subtotal = newVariations[i].cantidad*newPrice;
    } else {
      newAmount += productData.minimo_compra;
      newPrice = productData.precio * (1 -productData.descuento / 100);
    }
    subtotal += productData.minimo_compra * newPrice;
    setProductData((prevData) => ({
      ...prevData,
      variaciones: newVariations,
      cantidad: newAmount,
      subtotal: subtotal,
      canAddtoCart: cartSelected ? true : false
    }));

    if ((newStock != -1) && (newStock < newAmount)) {
      onMessage('¡No hay suficiente stock!');
      onVisible(true);
    }
  }

  const handleKeepShopping = () => {
    onKeepShopping();
  }

  const handleAddProducto = () => {
    onAddItemToCart(productData);
  }

  return (
    <div className="content-product" ref={ref}>
      <div className="left-box"
      >
        <div className={`sticky-image ${scrolledPast ? 'scrolling' : ''}`}>
          {prod.en_tv ?
            <div className="en_tv">
              <Tv /> En Tv
            </div>
            :null
          }
          {isAuthenticated && (prod.descuento > 0)
            ? <div className={`promo ${prod.en_tv ? 'down' : ''}`}>
                <Percent />
                Promo
              </div>
            : null}
          <SliderComponent images={prod.media} video={prod.video}></SliderComponent>
        </div>
      </div>
      <div className="right-box">
        <div className="header">
          <div className="breadcrumb">
            <Link to={`/`}>home</Link>
            {prod.categoryList.map((cat)=>{
              return (
                <span key={`cate_${cat.id}_a`} className="arrow">{' > '}
                  <Link key={`cate_${cat.id}_b`} to={`/categoria/${cat.id}-${convertStringToLink(cat.nombre)}`}>{cat.nombre}</Link>
                </span>
              )
            })}
            <span className="arrow">{' >'} {prod.nombre}</span>
          </div>
          <div className="title-content">
            <div className="tags-group">
              <div className="tag brand">
                <Link to="/marca/prueba">{prod.marca_nombre}</Link>
              </div>
              <div className="tag sku">SKU: {prod.sku}</div>
              {(prod.variaciones.length === 0 && prod.stock === 0) 
                ? <div className="tag in-stock">En Stock</div>
                : <div className="tag no-stock">Sin Stock</div>
              }
            </div>

            <div className="title">{prod.nombre}</div>
            {isAuthenticated &&
              <div className="price-content">
                <span className="sign">$</span>
                {
                  prod.descuento > 0 
                  ? <>{
                      formatCurrency(!user.disc_visib ? prod.precio * (1-user.discount/100) * (1-prod.descuento/100) : prod.precio * (1-prod.descuento/100))}
                        <div className="iva">+ iva</div>
                      <div className="origin-price">$ {formatCurrency(!user.disc_visib ? prod.precio * (1-user.discount/100) : prod.precio)}</div>
                    </> 
                  : <>{
                      formatCurrency(!user.disc_visib ? prod.precio * (1-user.discount/100) : prod.precio)}
                      <div className="iva">+ iva</div>
                    </>
                }
              </div>
            }
            <div className="package-conent">
              {/* //todo esta harcodeado */}
              <div><Box /> Cant. x paquete: 500 hojas</div>
              <div><Boxes /> Cant. x bulto: 40 resmas</div>
            </div>
          </div>
        </div>
        <div className="description-content">
          <div className="title">Detalle del producto</div>
            <div className="text">
              {prod.descripcion}
            </div>
          </div>
          {isAuthenticated && 
            <div className="textField">
              <div className="label">Observaciones del producto</div>
              <textarea className="type-" value={productData.observaciones} placeholder="Detalle aquí las observaciones de su pedido" name="observaciones" id="observaciones" cols="30" rows="3" 
              onChange={(e)=>this.setState({observaciones: e.target.value})}></textarea>
            </div>
          }
          <div className="footer"  style={{height: '560px'}}>
            {isAuthenticated
              ? <>
                {prod.variaciones.length > 0 &&
                  <>
                    <div className="catalog-product-content">
                      <div className="title-header">
                        <div className="title-text-content">
                          <div className="title-text">Arme su pedido</div>
                        </div>
                        <div className="title-border-rounded"></div>
                      </div>
                      <div className="catalog-table">
                        <Table>
                          <thead>
                            <tr>
                              <th>Color/Modelo</th>
                              <th>Precio</th>
                              <th>Dto.</th>
                              <th>Cant.</th>
                              <th>Subtotal</th>
                              <th>En Carrito</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productData.variaciones.map((item,i) => {
                              return (
                                <tr key={`variacion_${item.nombre}_${i}`}>
                                  <td><span className="tag">{item.nombre}</span></td>
                                  <td className="left">$ {formatCurrency(item.precio)}</td>
                                  <td className="left px-2">{item.descuento}%</td>
                                  <td>
                                    {cartSelected 
                                    ? <div className="input-container">
                                      <button className="control-btn" disabled={item.cantidad === 0} onClick={() => {handleDecrement(i)}}>-</button>
                                        <input
                                          type="number"
                                          className="input-number"
                                          value={item.cantidad}
                                          readOnly
                                        />
                                      <button className="control-btn" onClick={()=>{handleIncrement(i)}}>+</button>
                                    </div>
                                    : null}
                                  </td>
                                  <td className="left">$ {formatCurrency(item.subtotal)}</td>
                                  <td className="left">{item.inCart}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </>
                }
                
                {cartSelected
                  ?<>
                    <div className="subtotal"> 
                      Subtotal:
                      <div className="price-content">
                        <span className="sign">$</span>
                        {formatCurrency(productData.subtotal)}
                        <div className="iva">+ iva</div>
                      </div>
                    </div>
                    {prod.variaciones.length > 0
                      ? <>
                          <div className="action-content">
                            <div className="action-container variations">
                              <div className="btn-content">
                                <Button onClick={handleAddProducto}>Agregar al carrito <Cart /></Button>
                                <Button variant="secondary">Terminar compra</Button>
                              </div>
                            </div>
                            <div className="btn-content">
                              <Button  onClick={handleKeepShopping} className="follow">
                                <ArrowLeft />
                                <span>Volver y seguir comprando</span>
                              </Button>
                            </div>
                          </div>
                        </>
                      :<>
                        {productData.inCart > 0 && <div>Tiene {productData.inCart} en el carrito</div>}
                        <div className="action-content">
                          <div className="action-container">
                            <div className="dropdown">
                              <button className="control-btn" disabled={productData.cantidad === 0} onClick={()=>{handleDecrement()}}>-</button>
                              <div className="input-container">
                                <label>Cantidad</label>
                                <input
                                  type="number"
                                  className="input-number"
                                  value={productData.cantidad }
                                  readOnly
                                />
                              </div>
                              <button className="control-btn" onClick={()=>{handleIncrement()}}>+</button>
                            </div>
                            <div className="btn-content">
                              <Button onClick={handleAddProducto}>Agregar al carrito <Cart /></Button>
                            </div>
                          </div>
                          <div className="btn-content">
                            <Button  onClick={handleKeepShopping} className="follow">
                              <ArrowLeft />
                              <span>Volver y seguir comprando</span>
                            </Button>
                            <Button variant="secondary">Terminar compra</Button>
                          </div>
                        </div>
                      </>
                    }
                  </>
                : null
                }
              </>
              : <div className="btn-content">
                  <Button  onClick={()=>{window.location.href = "#/login";}}>Iniciar Sesión</Button>
                  <Button variant="secondary" onClick={()=>{window.location.href = "#/registro";}}>Registrate</Button>
                </div>
            }
            <div className="updated">
              <Clock />
              Actualizado el {prod.actualizado}
            </div>
          </div>
      </div>
    </div>
  );
}
