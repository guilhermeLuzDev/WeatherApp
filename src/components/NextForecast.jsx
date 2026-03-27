import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getWeatherIcon } from '../utils/weatherIcons';

const diasCompletos = {
  'Dom': 'Domingo', 'Seg': 'Segunda', 'Ter': 'Terça',
  'Qua': 'Quarta',  'Qui': 'Quinta',  'Sex': 'Sexta', 'Sáb': 'Sábado',
};

export default function NextForecast({ forecast, theme }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Próxima Previsão
        </Text>
        <Text style={styles.calIcon}>📅</Text>
      </View>

      {forecast.map((day, index) => (
        <View
          key={index}
          style={[
            styles.row,
            index === forecast.length - 1 && styles.lastRow,
          ]}
        >
          <Text style={[styles.day, { color: theme.textPrimary }]}>
            {diasCompletos[day.weekday] ?? day.weekday}
          </Text>
          <Text style={styles.icon}>{getWeatherIcon(day.condition)}</Text>
          <Text style={[styles.temps, { color: theme.textPrimary }]}>
            {day.max}°  {day.min}°
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  calIcon: { fontSize: 18 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  lastRow: { borderBottomWidth: 0 },
  day: { fontSize: 15, width: 90 },
  icon: { fontSize: 22 },
  temps: { fontSize: 14, fontWeight: '600' },
});
