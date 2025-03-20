// useValidation.js
import { useState } from 'react';

const useValidation = (initialValue, campo) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
 // const [errorMessageString, setErrorMessageString] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [validationsValues ] = useState({
    email : {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Debe ingresar un email válido."
    },
    phone: {
      // credit: jquery.h5validate.js / orefalo
      regex: /^[0-9 ]{0,13}$/,
      //regex: /^(?:(?:00|\+)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
      errorMessage: "* Número de teléfono inválido",
    },
    nameProduct: {
      regex: /^[^"']*$/,
      errorMessage: "Nombre inválido. Formato: No ingrese comillas simples ni dobles",
    },
    sku: {
      regex: /^([0][1-9][A-ZÑ][A-ZÑ][A-ZÑ][A-ZÑ][0-9][0-9][0-9][0-9])$/,
      errorMessage: "SKU inválido. Formato: 01ABCD1234",
    },
    onlyNumberSp: {
      regex: /^[0-9 ]+$/,
      errorMessage: "Ingrese Sólo números",
    },
    codBarras: {
     regex: /^[0-9 ]{12,16}$/,
     errorMessage: "Ingrese un código de barras válido. Sólo números, entre 12 y 16 caracteres"
    },
    minSize: {
      errorMessage: "Mínimo de ",
      errorMessage2: " caracteres autorizados",
    },
    maxSize: {
      errorMessage: "Máximo de ",
      errorMessage2: " caracteres autorizados",
    },
  })

  const handleChange = (e) => {
    setValue(e.target.value);
    validate(e.target.value);
  };

  const validate = (value) => {
     const regex = new RegExp(validationsValues[campo].regex);
    if (!regex.test(value)) {
      setIsValid(false);
      setErrorMessage(validationsValues[campo].errorMessage);
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  };

  return {
    value,
    isValid,
    errorMessage,
    handleChange,
    setValue
  };
};

export default useValidation;
