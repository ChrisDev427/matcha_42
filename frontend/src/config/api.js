const API_BASE_URL = 'http://192.168.1.45:8081';

export const fetchData = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Autres en-têtes par défaut
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    console.log("api_base_url ", API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`Erreur: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
    throw error;
  }
};
