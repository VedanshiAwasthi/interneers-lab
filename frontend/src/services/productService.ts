import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/products/";

export const getPaginatedProducts = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    console.log(response.data);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  console.log(`${API_URL}${id}/`);
  const response = await axios.get(`${API_URL}${id}/`);
  console.log(response);
  return response;
};

export const updateProduct = async (id: string, updatedData: any) => {
  console.log(updatedData);
  console.log(`${API_URL}${id}/`);
  const response = await axios.patch(`${API_URL}${id}/update/`, updatedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  console.log(`${API_URL}${id}/`);
  const response = await axios.delete(`${API_URL}${id}/delete/`);
  return response.data;
};

export const addCategory = async (product_id: string, categ_id: string) => {
  const response = await axios.put(
    `${API_URL}${product_id}/add-category/${categ_id}/`,
  );

  return response.data;
};
