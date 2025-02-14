import { useParams } from 'react-router-dom';
import Producto from '../components/productos/Producto';
import './ProductoAmpliado.scss';
import { useEffect, useState } from 'react';
import { fetchProductData } from '../services/ProductServices';

export default function ProductoAmpliado(){
  const { id } = useParams();
  const [productoData, setProductoData] = useState({variaciones: []})

  useEffect(()=>{
    fetchProductData(id)
      .then(data => {
        setProductoData(data);
        if (data.descuento > 0) {
          setProductoData((prevData) => ({
            ...prevData,
            precioDesc: data.precio * (100 - data.descuento)/100
          })
          )
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [id])

  return (
    <div className='content-wrap'>
      {/*Producto Ampliado*/}
       <Producto p={productoData} /> 
    </div>
  );
}