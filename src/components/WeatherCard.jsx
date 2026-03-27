import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getWeatherIconCorrected } from '../utils/weatherIcons';

export default function WeatherCard({ weather, theme }) {
  if (!weather) return null;

  const icon = getWeatherIconCorrected(weather.condition_slug, theme.isNight);

  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.temp, { color: theme.textPrimary }]}>{weather.temp}°</Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>{weather.description}</Text>
      <Text style={[styles.maxMin, { color: theme.textSecondary }]}>
        Máx.: {weather.forecast[0].max}°  Mín.: {weather.forecast[0].min}°
      </Text>
      <View style={styles.detailsRow}>
        <View style={[styles.detailBox, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>💧 Umidade</Text>
          <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{weather.humidity}%</Text>
        </View>
        <View style={[styles.detailBox, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>🌧 Chuva</Text>
          <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{weather.rain ?? 0}%</Text>
        </View>
        <View style={[styles.detailBox, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>💨 Vento</Text>
          <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{weather.wind_speedy}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', alignItems: 'center', paddingVertical: 20 },
  icon: { fontSize: 80, marginBottom: 8 },
  temp: { fontSize: 80, fontWeight: 'bold', lineHeight: 90 },
  description: { fontSize: 16, marginTop: 4, textTransform: 'capitalize' },
  maxMin: { fontSize: 14, marginBottom: 16 },
  detailsRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  detailBox: { borderRadius: 12, paddingVertical: 8, paddingHorizontal: 14, alignItems: 'center' },
  detailLabel: { fontSize: 11, marginBottom: 2 },
  detailValue: { fontSize: 14, fontWeight: 'bold' },
});
