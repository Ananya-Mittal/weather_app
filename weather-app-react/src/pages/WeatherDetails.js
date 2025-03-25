import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import { formatDateTime } from '../utils/helpers';

const WeatherDetails = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const { fetchWeatherDetails, loading } = useWeather();
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeatherDetails = async () => {
      if (!city) return;
      
      try {
        const data = await fetchWeatherDetails(decodeURIComponent(city));
        setWeatherDetails(data);
      } catch (err) {
        console.error('Error fetching weather details:', err);
        setError(err.message || 'Failed to fetch weather data. Please try again.');
      }
    };

    getWeatherDetails();
  }, [city, fetchWeatherDetails]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading weather data for {decodeURIComponent(city)}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Weather Data</h4>
          <p>{error}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  // Handle the case when weatherDetails is not loaded yet
  if (!weatherDetails) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          No weather data available for {decodeURIComponent(city)}
        </div>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  // Safe extraction of nested properties with fallbacks
  const location = weatherDetails.location || {};
  const current = weatherDetails.current || {};
  const forecast = weatherDetails.forecast || {};
  const forecastDays = forecast.forecastday || [];
  const currentCondition = current.condition || {};
  const firstDay = forecastDays[0] || {};
  const astro = firstDay.astro || {};
  const hourData = firstDay.hour || [];

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left me-2"></i> Back to Home
          </button>
        </div>
      </div>

      {/* Location and Current Weather Overview */}
      <div className="card shadow-lg mb-5">
        <div className="card-header bg-primary text-white py-3">
          <h2 className="mb-0">Weather Details</h2>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="card-title mb-3">{location.name || city}, {location.country || ''}</h1>
              <p className="text-muted mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                {location.region || 'Region not available'}
              </p>
              <p className="text-muted">
                <i className="far fa-clock me-2"></i>
                Local time: {location.localtime ? formatDateTime(location.localtime) : 'Not available'}
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                <div className="me-4 text-center">
                  {currentCondition.icon && (
                    <img src={currentCondition.icon} alt={currentCondition.text || 'Weather condition'} width="100" />
                  )}
                  <p className="mb-0 fs-5">{currentCondition.text || 'No condition data'}</p>
                </div>
                <div className="text-center">
                  <h2 className="display-3 mb-0">{current.temp_c !== undefined ? `${current.temp_c}°C` : 'N/A'}</h2>
                  <p className="mb-0">Feels like {current.feelslike_c !== undefined ? `${current.feelslike_c}°C` : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Conditions Card */}
      <div className="row mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Current Conditions</h3>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-1"><i className="fas fa-tint me-2 text-primary"></i>Humidity</h5>
                    <p className="mb-0 fs-5">{current.humidity !== undefined ? `${current.humidity}%` : 'N/A'}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-1"><i className="fas fa-wind me-2 text-primary"></i>Wind</h5>
                    <p className="mb-0 fs-5">{current.wind_kph !== undefined ? `${current.wind_kph} km/h` : 'N/A'}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-1"><i className="fas fa-compass me-2 text-primary"></i>Direction</h5>
                    <p className="mb-0 fs-5">{current.wind_dir || 'N/A'}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-1"><i className="fas fa-compress-arrows-alt me-2 text-primary"></i>Pressure</h5>
                    <p className="mb-0 fs-5">{current.pressure_mb !== undefined ? `${current.pressure_mb} mb` : 'N/A'}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-1"><i className="fas fa-eye me-2 text-primary"></i>Visibility</h5>
                    <p className="mb-0 fs-5">{current.vis_km !== undefined ? `${current.vis_km} km` : 'N/A'}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-1"><i className="fas fa-sun me-2 text-primary"></i>UV Index</h5>
                    <p className="mb-0 fs-5">{current.uv !== undefined ? current.uv : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sunrise & Sunset Card */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Sunrise & Sunset</h3>
            </div>
            <div className="card-body">
              <div className="row align-items-center justify-content-center h-100">
                <div className="col-6 text-center">
                  <div className="p-3">
                    <i className="fas fa-sunrise text-warning fa-4x mb-3"></i>
                    <h4>Sunrise</h4>
                    <p className="fs-5 mb-0">{astro.sunrise || "N/A"}</p>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="p-3">
                    <i className="fas fa-sunset text-danger fa-4x mb-3"></i>
                    <h4>Sunset</h4>
                    <p className="fs-5 mb-0">{astro.sunset || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Section */}
      {forecastDays.length > 0 && (
        <div className="card shadow-sm mb-5">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">3-Day Forecast</h3>
          </div>
          <div className="card-body px-0 py-3">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-3">Date</th>
                    <th>Condition</th>
                    <th>High / Low</th>
                    <th>Precipitation</th>
                    <th>Wind</th>
                    <th className="pe-3">Humidity</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastDays.map((day, index) => {
                    const dayData = day.day || {};
                    const dayCondition = dayData.condition || {};
                    
                    return (
                      <tr key={index}>
                        <td className="ps-3">
                          <strong>{day.date ? new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Unknown'}</strong>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {dayCondition.icon && (
                              <img src={dayCondition.icon} alt={dayCondition.text || ''} width="40" className="me-2" />
                            )}
                            <span>{dayCondition.text || 'N/A'}</span>
                          </div>
                        </td>
                        <td>{dayData.maxtemp_c !== undefined ? `${dayData.maxtemp_c}°` : 'N/A'} / {dayData.mintemp_c !== undefined ? `${dayData.mintemp_c}°` : 'N/A'}</td>
                        <td>{dayData.totalprecip_mm !== undefined ? `${dayData.totalprecip_mm} mm` : 'N/A'}</td>
                        <td>{dayData.maxwind_kph !== undefined ? `${dayData.maxwind_kph} km/h` : 'N/A'}</td>
                        <td className="pe-3">{dayData.avghumidity !== undefined ? `${dayData.avghumidity}%` : 'N/A'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      
      {hourData.length > 0 && (
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Today's Hourly Forecast</h3>
          </div>
          <div className="card-body">
            <div className="row flex-nowrap overflow-auto pb-3 px-2 gx-2">
              {hourData.map((hour, index) => {
                const hourCondition = hour.condition || {};
                const hourTime = hour.time ? new Date(hour.time) : null;
                
                return (
                  <div className="col-4 col-md-2" key={index}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center p-2">
                        <h5 className="card-title">{hourTime ? hourTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }) : 'N/A'}</h5>
                        {hourCondition.icon && (
                          <img src={hourCondition.icon} alt={hourCondition.text || ''} className="my-2" width="50" />
                        )}
                        <h4 className="mb-1">{hour.temp_c !== undefined ? `${hour.temp_c}°C` : 'N/A'}</h4>
                        <p className="mb-0 small">{hourCondition.text || 'N/A'}</p>
                        <div className="d-flex justify-content-between mt-2 small">
                          <span title="Precipitation"><i className="fas fa-tint text-primary"></i> {hour.precip_mm !== undefined ? `${hour.precip_mm}mm` : 'N/A'}</span>
                          <span title="Wind"><i className="fas fa-wind text-primary"></i> {hour.wind_kph !== undefined ? `${hour.wind_kph}km/h` : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;