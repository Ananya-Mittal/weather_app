import React, { useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import { useWeather } from '../hooks/useWeather';

const Home = () => {
  const { currentWeather, popularCities, loading, error, fetchWeatherForCity } = useWeather();

  useEffect(() => {
    
    if (!currentWeather && !loading) {
      fetchWeatherForCity('London');
    }
  }, [currentWeather, loading, fetchWeatherForCity]); 

  const renderPopularCities = () => {
    if (!popularCities || popularCities.length === 0) {
      return <p className="text-center">No popular cities data available</p>;
    }

    return (
      <div className="row g-4">
        {popularCities.map((city, index) => (
          <div className="col-md-6 col-lg-4" key={`city-${city.city || index}`}>
            <WeatherCard weather={city} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row mb-5">
            <div className="col-12">
              <h1 className="mb-4 text-center">Current Weather</h1>
              <div className="d-flex justify-content-center">
                <div style={{ maxWidth: '500px', width: '100%' }}>
                  {currentWeather ? (
                    <WeatherCard weather={currentWeather} />
                  ) : (
                    <p className="text-center">No weather data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h2 className="mb-4 text-center">Popular Cities</h2>
              {renderPopularCities()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;