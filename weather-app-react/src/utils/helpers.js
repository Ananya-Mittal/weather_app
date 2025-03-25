export const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  export const getWeatherIconClass = (condition) => {
    if (!condition) return 'fa-cloud';
    
    const lowercaseCondition = condition.toLowerCase();
    
    if (lowercaseCondition.includes('sunny') || lowercaseCondition.includes('clear')) {
      return 'fa-sun';
    } else if (lowercaseCondition.includes('rain')) {
      return 'fa-cloud-rain';
    } else if (lowercaseCondition.includes('snow')) {
      return 'fa-snowflake';
    } else if (lowercaseCondition.includes('cloud')) {
      return 'fa-cloud';
    } else if (lowercaseCondition.includes('thunder') || lowercaseCondition.includes('storm')) {
      return 'fa-bolt';
    } else if (lowercaseCondition.includes('fog') || lowercaseCondition.includes('mist')) {
      return 'fa-smog';
    } else if (lowercaseCondition.includes('wind')) {
      return 'fa-wind';
    } else {
      return 'fa-cloud';
    }
  };
  
  export const getTimePeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };