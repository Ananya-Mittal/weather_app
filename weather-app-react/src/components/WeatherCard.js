import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/WeatherCard.css';

const getWeatherBackground = (condition) => {
  if (!condition) return 'default-bg';
  
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return 'sunny-bg';
  } else if (lowerCondition.includes('cloud')) {
    return 'cloudy-bg';
  } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return 'rainy-bg';
  } else if (lowerCondition.includes('snow')) {
    return 'snowy-bg';
  } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return 'stormy-bg';
  }
  
  return 'default-bg';
};

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return <div className="weather-card loading">Loading weather data...</div>;
  }

  const { 
    city = 'Unknown location', 
    temperature = 0, 
    condition = 'Unknown condition', 
    icon = '', 
    humidity = 0, 
    windSpeed = 0 
  } = weather;

  return (
    <div 
      className={`weather-card ${getWeatherBackground(condition)}`}
      aria-label={`Weather for ${city}: ${condition}, ${Math.round(temperature)}°C`}
    >
      <div className="weather-card-content">
        <div className="weather-card-header">
          <h2 className="city-name">{city}</h2>
          <div className="weather-icon">
            {icon ? (
              <img src={icon} alt={`${condition} weather icon`} />
            ) : (
              <i className="fas fa-cloud" aria-hidden="true"></i>
            )}
          </div>
        </div>
        
        <div className="weather-details">
          <div className="temperature">
            <span className="value">{Math.round(temperature)}</span>
            <span className="unit">°C</span>
          </div>
          <p className="condition">{condition}</p>
          
          <div className="additional-info">
            <div className="info-item">
              <i className="fas fa-tint" aria-hidden="true"></i>
              <span>{humidity}% humidity</span>
            </div>
            <div className="info-item">
              <i className="fas fa-wind" aria-hidden="true"></i>
              <span>{windSpeed} km/h wind</span>
            </div>
          </div>
        </div>
        
        <Link 
          to={`/details/${encodeURIComponent(city)}`} 
          className="btn btn-light mt-3 w-100"
          aria-label={`View detailed weather forecast for ${city}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

WeatherCard.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    temperature: PropTypes.number,
    condition: PropTypes.string,
    icon: PropTypes.string,
    humidity: PropTypes.number,
    windSpeed: PropTypes.number
  })
};


export default memo(WeatherCard);