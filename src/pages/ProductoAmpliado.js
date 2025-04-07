import { useNavigate, useParams } from 'react-router-dom';
import Producto from '../components/productos/Producto';
import './ProductoAmpliado.scss';
import { useContext, useEffect, useState } from 'react';
import { addProductToCart, fetchProductData } from '../services/ProductServices';
import { AuthContext } from '../services/AuthContext';
import ErrorPage from './ErrorPage';
import { Alert, Spinner } from 'react-bootstrap';

export default function ProductoAmpliado(){
  const { productInfo } = useParams();
  const [productId, ...productNameParts] = productInfo.split('-');
  const productName = productNameParts.join(' ').replace(/_/g, " "); // Unir de nuevo el nombre del producto (en caso de que tenga más de una palabra)
  const navigate = useNavigate();

  const [productoData, setProductoData] = useState({variaciones: []})
  const { isAuthenticated, user, cart, updateCart } = useContext(AuthContext);
  const [visibleError, setVisibleError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Función para actualizar el mensaje
  const handleMessage = (message) => {
    setMessage(message);
  };

  const handleVisible = (value) => {
    setVisibleError(value);
  }

  useEffect(()=>{
    setLoading(true);
    fetchProductData(productId)
      .then(data => {
        setProductoData(data);
        const index = cart.findIndex(prod => prod.producto_id == productId)
        if (index > -1) {
          setProductoData((prevData) => 
            data.variaciones.length > 0 ?
              {
                ...prevData,
                variaciones: cart[index].variaciones.reduce((newVariaciones, vari) => {
                  const existingVari = prevData.variaciones.find(it => it.id === vari.id);
    
                  if (existingVari) {
                    // Si la variación existe, actualizamos su valor
                    return newVariaciones.map(varIt => 
                      varIt.id === vari.id
                        ? { ...varIt, 
                          inCart: vari.cantidad
                        }
                        : varIt
                    );
                  }
                }, [...prevData.variaciones])
              }
            : {...prevData, inCart: cart[index].cantidad}
          )
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(()=>{setLoading(false)})
  }, [productId, cart])

  const addItemToCart = async (item) => {
    item.userId = user.id;
    item.producto_id = productoData.id;
    var f = new FormData();
    f.append("producto_id", item.producto_id);
    f.append("variaciones", JSON.stringify(item.variaciones));
    f.append("cantidad", item.cantidad);
    f.append("subtotal", item.subtotal);
    f.append("observaciones", item.observaciones);
    if (user.isSeller && user.clientSelected) {
      f.append("cliente_id", user.clientSelected);
    }
    setLoading(true);
    addProductToCart(f, item.userId)
      .then((data) => {
        updateCart(data.data);
        localStorage.setItem('productoAgregado', JSON.stringify({nombre: productName, img: productoData.media[0].preview}))
        navigate(sessionStorage.getItem('prevState'));
      })
      .catch((err)=>{console.log(err)})
      .finally(()=>{setLoading(false)})
  };

  const keepShopping = () => {
    localStorage.removeItem('productoAgregado');
    navigate(sessionStorage.getItem('prevState'));
  }

  return (
    <div className='content-wrap'>
      {loading ?
        <div className='content-loading'>
          <Spinner variant='success' />
        </div>
        :
        <>
          <Alert variant="danger" dismissible show={visibleError} onClose={() => setVisibleError(false)}>
            {message}
          </Alert>
          {productoData.id ? 
            <Producto 
                p={productoData}
                user={user}
                authenticated={isAuthenticated} 
                onMessage={handleMessage} 
                onVisible={handleVisible} 
                onAddItemToCart={addItemToCart} 
                onKeepShopping={keepShopping}
              /> 
            : <ErrorPage errorMessage={`No existe un producto con ese id`}/>
          }
        </>
      }
    </div>
  );
}