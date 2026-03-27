import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.hgbrasil.com',
  timeout: 10000,
  headers: { 'Accept': 'application/json' },
});

export const getWeather = async (city = 'Recife,PE') => {
  const response = await api.get('/weather', {
    params: {
      key: 'ba94c742',
      city_name: city,
      format: 'json-cors',
    },
  });
  return response.data.results;
};

export default api;
