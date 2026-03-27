const weatherIcons = {
  storm: '⛈️',
  snow: '❄️',
  hail: '🌨️',
  rain: '🌧️',
  fog: '🌫️',
  clear_day: '☀️',
  clear_night: '🌙',
  cloud: '☁️',
  cloudly_day: '⛅',
  cloudly_night: '🌥️',
  partly_cloudy_night: '🌤️',
  sleet: '🌦️',
  wind: '💨',
  tornado: '🌪️',
  none_day: '🌡️',
  none_night: '🌡️',
};

export const getWeatherIcon = (slug) => {
  return weatherIcons[slug] ?? '🌡️';
};

export const getWeatherIconCorrected = (slug, isNight) => {
  const base = slug.replace('_day', '').replace('_night', '');

  const map = {
    clear:   isNight ? '🌙' : '☀️',
    cloudly: isNight ? '🌥️' : '⛅',
    cloud:   '☁️',
    rain:    '🌧️',
    storm:   '⛈️',
    snow:    '❄️',
    fog:     '🌫️',
    hail:    '🌨️',
    sleet:   '🌦️',
    wind:    '💨',
    tornado: '🌪️',
    none:    isNight ? '🌙' : '🌡️',
  };

  return map[base] ?? (isNight ? '🌙' : '🌡️');
};
