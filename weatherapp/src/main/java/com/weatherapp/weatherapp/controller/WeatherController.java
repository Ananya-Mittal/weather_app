package com.weatherapp.weatherapp.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weatherapp.weatherapp.model.Weather;
import com.weatherapp.weatherapp.service.WeatherService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    
    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping(value = "/current", produces = "application/json")
    public ResponseEntity<Weather> getCurrentWeather(@RequestParam String city) {
        Weather weather = weatherService.getWeatherByCity(city);
        return ResponseEntity.ok(weather);
    }
    
    @GetMapping(value = "/details", produces = "application/json")
    public ResponseEntity<Object> getWeatherDetails(@RequestParam String city) {
        Object details = weatherService.getWeatherDetails(city);
        return ResponseEntity.ok(details);
    }
    
    @GetMapping(value = "/popular", produces = "application/json")
    public ResponseEntity<List<Weather>> getPopularCitiesWeather() {
        List<Weather> popularCities = weatherService.getPopularCitiesWeather();
        return ResponseEntity.ok(popularCities);
    }
}