import { createContext, useContext, useState } from "react";

// Create a context
export const PageContext = createContext();

// AuthProvider component to provide auth state
export const PageProvider = ({ children }) => {
  //Paginado
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1);  // Total de páginas
  const [itemsPerPage, setItemsPerPage] = useState(50); // Elementos por página (10)
  const [pageGroup, setPageGroup] = useState([50,100,150,200])
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Cambia la página
  };

  const handleLimitChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Actualizar el límite
    setCurrentPage(1); // Resetear a la primera página cuando se cambia el límite
  };

  const resetPages = () => {
    setCurrentPage(1);
  }

  return (
    <PageContext.Provider value={{ currentPage, totalPages, itemsPerPage, pageGroup, paginate, setTotalPages, handleLimitChange, resetPages }}>
      {children}
    </PageContext.Provider>
  );
}