package com.weatherapp.weatherapp.service;




import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.weatherapp.weatherapp.WeatherApiResponse;
import com.weatherapp.weatherapp.model.Weather;

@Service
public class WeatherService {

    @Value("${weather.api.url}")
    private String weatherApiUrl;

    @Value("${weather.api.key}")
    private String weatherApiKey;

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Weather getWeatherByCity(String city) {
        String apiUrl = String.format("%s/current.json?key=%s&q=%s&aqi=no", weatherApiUrl, weatherApiKey, city);

        ResponseEntity<WeatherApiResponse> response = restTemplate.getForEntity(apiUrl, WeatherApiResponse.class);

        if (response.getBody() == null) {
            throw new RuntimeException("Failed to fetch weather data");
        }

        
        return convertToWeather(response.getBody());
    }
    
    public Object getWeatherDetails(String city) {
        String apiUrl = String.format("%s/forecast.json?key=%s&q=%s&days=3&aqi=no&alerts=no", weatherApiUrl, weatherApiKey, city);
        
        ResponseEntity<Object> response = restTemplate.getForEntity(apiUrl, Object.class);
        
        if (response.getBody() == null) {
            throw new RuntimeException("Failed to fetch weather details");
        }
        
        return response.getBody();
    }
    
    public List<Weather> getPopularCitiesWeather() {
        List<String> popularCities = List.of("London", "New York", "Tokyo", "Paris", "Sydney", "Dubai");
        List<Weather> results = new ArrayList<>();
        
        for (String city : popularCities) {
            try {
                results.add(getWeatherByCity(city));
            } catch (Exception e) {
               
                System.err.println("Error fetching weather for " + city + ": " + e.getMessage());
            }
        }
        
        return results;
    }

    private Weather convertToWeather(WeatherApiResponse apiResponse) {
        Weather weather = new Weather();
        weather.setCity(apiResponse.getLocation().getName());
        weather.setTemperature(apiResponse.getCurrent().getTemp_c());
        weather.setCondition(apiResponse.getCurrent().getCondition().getText());
        weather.setHumidity(apiResponse.getCurrent().getHumidity());
        weather.setWindSpeed(apiResponse.getCurrent().getWind_kph());
        weather.setIcon(apiResponse.getCurrent().getCondition().getIcon());
        return weather;
    }
}