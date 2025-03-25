package com.weatherapp.weatherapp;

public class WeatherApiResponse {
    private LocationDto location;
    private CurrentDto current;
    
    
    public LocationDto getLocation() { return location; }
    public void setLocation(LocationDto location) { this.location = location; }
    
    public CurrentDto getCurrent() { return current; }
    public void setCurrent(CurrentDto current) { this.current = current; }
    
   
    public static class LocationDto {
        private String name;
        private String region;
        private String country;
        private double lat;
        private double lon;
        private String localtime;
        
       
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getRegion() { return region; }
        public void setRegion(String region) { this.region = region; }
        
        public String getCountry() { return country; }
        public void setCountry(String country) { this.country = country; }
        
        public double getLat() { return lat; }
        public void setLat(double lat) { this.lat = lat; }
        
        public double getLon() { return lon; }
        public void setLon(double lon) { this.lon = lon; }
        
        public String getLocaltime() { return localtime; }
        public void setLocaltime(String localtime) { this.localtime = localtime; }
    }
    
    public static class CurrentDto {
        private double temp_c;
        private double feelslike_c;
        private double humidity;
        private double wind_kph;
        private String wind_dir;
        private double pressure_mb;
        private double vis_km;
        private double uv;
        private ConditionDto condition;
        
       
        public double getTemp_c() { return temp_c; }
        public void setTemp_c(double temp_c) { this.temp_c = temp_c; }
        
        public double getFeelslike_c() { return feelslike_c; }
        public void setFeelslike_c(double feelslike_c) { this.feelslike_c = feelslike_c; }
        
        public double getHumidity() { return humidity; }
        public void setHumidity(double humidity) { this.humidity = humidity; }
        
        public double getWind_kph() { return wind_kph; }
        public void setWind_kph(double wind_kph) { this.wind_kph = wind_kph; }
        
        public String getWind_dir() { return wind_dir; }
        public void setWind_dir(String wind_dir) { this.wind_dir = wind_dir; }
        
        public double getPressure_mb() { return pressure_mb; }
        public void setPressure_mb(double pressure_mb) { this.pressure_mb = pressure_mb; }
        
        public double getVis_km() { return vis_km; }
        public void setVis_km(double vis_km) { this.vis_km = vis_km; }
        
        public double getUv() { return uv; }
        public void setUv(double uv) { this.uv = uv; }
        
        public ConditionDto getCondition() { return condition; }
        public void setCondition(ConditionDto condition) { this.condition = condition; }
    }
    
    public static class ConditionDto {
        private String text;
        private String icon;
        
    
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
    }
}