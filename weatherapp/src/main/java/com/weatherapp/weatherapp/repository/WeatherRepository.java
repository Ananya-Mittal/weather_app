package com.weatherapp.weatherapp.repository;





import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weatherapp.weatherapp.model.Weather;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
    Optional<Weather> findByCityIgnoreCase(String city);
}