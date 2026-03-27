export const getTheme = (conditionSlug, localTime, timezone) => {
  let hour;

  if (timezone) {
    const offsetMatch = timezone.match(/([+-])(\d{2}):(\d{2})/);
    if (offsetMatch) {
      const sign = offsetMatch[1] === '+' ? 1 : -1;
      const offsetMinutes = sign * (parseInt(offsetMatch[2]) * 60 + parseInt(offsetMatch[3]));
      const utcNow = new Date();
      const localMs = utcNow.getTime() + utcNow.getTimezoneOffset() * 60000 + offsetMinutes * 60000;
      hour = new Date(localMs).getHours();
    }
  }

  if (hour === undefined) {
    hour = localTime ? parseInt(localTime.split(':')[0]) : new Date().getHours();
  }

  const isNight = hour >= 18 || hour < 6;
  const isSunny = ['clear_day', 'cloudly_day'].includes(conditionSlug);

  if (isNight) {
    return {
      isNight: true,
      background: '#0d1b4b',
      cardBg: 'rgba(255,255,255,0.10)',
      textPrimary: '#ffffff',
      textSecondary: '#aaaaaa',
    };
  }
  if (isSunny) {
    return {
      isNight: false,
      background: '#29b6f6',
      cardBg: 'rgba(255,255,255,0.25)',
      textPrimary: '#ffffff',
      textSecondary: '#e0f7ff',
    };
  }
  return {
    isNight: false,
    background: '#1a237e',
    cardBg: 'rgba(255,255,255,0.12)',
    textPrimary: '#ffffff',
    textSecondary: '#aaaaaa',
  };
};
