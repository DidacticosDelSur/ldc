import React, { createContext, useContext } from 'react';

// Crear un contexto para las funciones globales
export const GlobalFunctionsContext = createContext({});

// Proveedor de funciones globales
export const GlobalFunctionsProvider = ({ children }) => {
  // Definir las funciones globales
  const eliminarCaracteresRaros = (str) => {
    // Eliminar acentos
    const sinAcentos = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  
    // Eliminar caracteres no alfanuméricos (excepto espacios)
    return sinAcentos.replace(/[^a-zA-Z0-9\s]/g, "");
  }

  const globalFunctions = {
    formatCurrency: (value) => {
      return new Intl.NumberFormat('es-AR', { 
        style: 'currency', 
        currency: 'ARS' 
      }).format(value);
    },
    
    calculatePercentage: (value, total) => {
      return ((value / total) * 100).toFixed(2);
    },
    
    validateEmail: (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    formatNumber: (value) => {
      return String(value).padStart('5',0)
    },

    convertStringToLink: (value) => {
      let cleanedText = eliminarCaracteresRaros(value);
      return cleanedText.replace(/ /g, "-")
    }
  };

  return (
    <GlobalFunctionsContext.Provider value={globalFunctions}>
      {children}
    </GlobalFunctionsContext.Provider>
  );
};

// Hook personalizado para usar las funciones globales
/* export const useGlobalFunctions = () => {
  return useContext(GlobalFunctionsContext);
};

// Ejemplo de uso en un componente
function ExampleComponent() {
  const { formatCurrency, calculatePercentage } = useGlobalFunctions();
  
  return (
    <div>
      <p>Precio: {formatCurrency(1000)}</p>
      <p>Porcentaje: {calculatePercentage(50, 200)}%</p>
    </div>
  );
} */