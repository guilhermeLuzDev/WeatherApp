import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getWeatherIconCorrected } from '../utils/weatherIcons';

const generateHours = (localTime) => {
  const currentHour = localTime
    ? parseInt(localTime.split(':')[0])
    : new Date().getHours();

  const offsets = [-2, -1, 0, 1];
  return offsets.map(offset => {
    const hour = (currentHour + offset + 24) % 24;
    return {
      time: `${String(hour).padStart(2, '0')}:00`,
      isCurrent: offset === 0,
    };
  });
};

export default function HourlyForecast({ forecast, localTime, conditionSlug, theme }) {
  if (!forecast) return null;

  const baseTemp = forecast.max ?? 31;
  const hours = generateHours(localTime);

  const icon = getWeatherIconCorrected(conditionSlug, theme.isNight);

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Hoje</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.row}>
        {hours.map((item, index) => (
          <View
            key={index}
            style={[
              styles.hourBlock,
              { backgroundColor: theme.cardBg },
              item.isCurrent && styles.currentBlock,
            ]}
          >
            <Text style={[styles.temp, { color: theme.textPrimary }]}>
              {baseTemp - index}°C
            </Text>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={[styles.rainProb, { color: theme.textSecondary }]}>
              🌧 {forecast.rain_probability}%
            </Text>
            <Text style={[
              styles.time,
              { color: theme.textSecondary },
              item.isCurrent && { color: theme.textPrimary, fontWeight: 'bold' },
            ]}>
              {item.time}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', borderRadius: 16, padding: 16, marginTop: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontWeight: 'bold', fontSize: 16 },
  date: { fontSize: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  hourBlock: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 4,
  },
  currentBlock: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255,255,255,0.30)',
  },
  currentLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  temp: { fontSize: 14, fontWeight: 'bold' },
  icon: { fontSize: 24, marginVertical: 4 },
  rainProb: { fontSize: 11, marginBottom: 4 },
  time: { fontSize: 12 },
});
