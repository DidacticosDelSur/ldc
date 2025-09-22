
import axios from "axios";

export async function fetchData(endpoint, params = null) {
  const baseUrl = process.env.REACT_APP_WEB_SERVICES;
  let urlComplete = baseUrl + endpoint;

  try {
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      urlComplete = urlComplete + `?${queryString}`;
    }

    const response = await fetch(urlComplete);

    if (!response.ok) {
      const errorDetails = await response.json();
      throw { data: errorDetails };  // Lanzamos el error con un JSON
    }

    const data = await response.json();
    return data;
  } catch (error) {
      throw error;
  }
}

export async function createData(endpoint, datos, params) {
  const baseUrl = process.env.REACT_APP_WEB_SERVICES;
  let urlComplete = baseUrl + endpoint;
  try {
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      urlComplete = urlComplete + `?${queryString}`;
    }

    const response = await axios.post(urlComplete, datos)
    const data = await response;
    return data;
  } catch (error) {
      throw error;
  }
}

export async function editData(endpoint, id, datos, params = null) {
  const baseUrl = process.env.REACT_APP_WEB_SERVICES;
  let urlComplete = baseUrl + endpoint;
  try {
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      urlComplete = urlComplete + `?${queryString}`;
    } 
    const response = await axios.post(urlComplete, datos, { params: { id: id } })
    const data = await response;
    return data;
  } catch (error) {
      throw error;
  }
}