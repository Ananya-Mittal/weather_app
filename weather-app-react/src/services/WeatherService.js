import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/weather';


export const fetchWeatherForCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/current?city=${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};


export const fetchWeatherDetails = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/details?city=${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather details');
  }
};


export const fetchPopularCitiesWeather = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/popular`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch popular cities weather data');
  }
};


export const postWeatherDetail = async (weatherData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, weatherData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to post weather data');
  }
};
