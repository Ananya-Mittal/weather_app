import React, { createContext, useState, useCallback, useEffect } from 'react';
import * as WeatherService from '../services/WeatherService';

export const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [popularCities, setPopularCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherForCity = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await WeatherService.fetchWeatherForCity(city);
      setCurrentWeather(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPopularCitiesWeather = useCallback(async () => {
    setLoading(true);
    try {
      const data = await WeatherService.fetchPopularCitiesWeather();
      setPopularCities(data);
    } catch (err) {
      console.error('Error fetching popular cities:', err);
      setError('Failed to fetch popular cities data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherDetails = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await WeatherService.fetchWeatherDetails(city);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch weather details');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCity = useCallback((city) => {
    return fetchWeatherForCity(city);
  }, [fetchWeatherForCity]);

  useEffect(() => {
    fetchPopularCitiesWeather();
  }, [fetchPopularCitiesWeather]);

  const value = {
    currentWeather,
    popularCities,
    loading,
    error,
    fetchWeatherForCity,
    fetchWeatherDetails,
    searchCity,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};