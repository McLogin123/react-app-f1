const API_URL = "https://interesting-krystalle-oo-oo-3becd75b.koyeb.app/api";

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Error en la peticion");
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

export const getPilotos = () => apiRequest("/drivers").then((res) => res.data);
export const createPiloto = (data) =>
  apiRequest("/drivers", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.data);
export const updatePiloto = (id, data) =>
  apiRequest(`/drivers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }).then((res) => res.data);
export const deletePiloto = (id) =>
  apiRequest(`/drivers/${id}`, {
    method: "DELETE",
  });

export const getEquipos = () => apiRequest("/teams").then((res) => res.data);
