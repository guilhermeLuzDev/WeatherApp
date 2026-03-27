import { useEffect, useState } from 'react';
import {
  ActivityIndicator, SafeAreaView, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HourlyForecast from '../components/HourlyForecast';
import NextForecast from '../components/NextForecast';
import WeatherCard from '../components/WeatherCard';
import { getWeather } from '../services/api';
import { getTheme } from '../utils/theme';

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Recife,PE');
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const fetchWeather = (cityName) => {
    setLoading(true);
    setError(null);
    getWeather(cityName)
      .then(data => setWeather(data))
      .catch(err => {
        console.error(err);
        setError('Cidade não encontrada.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchWeather(city); }, []);

  const handleSearch = () => {
    if (search.trim() === '') return;
    setCity(search.trim());
    fetchWeather(search.trim());
    setShowSearch(false);
    setSearch('');
  };


  const theme = weather
  ? getTheme(weather.condition_slug, weather.time, weather.timezone)
  : getTheme('cloud', null, null);


  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <Text style={styles.errorText}>{error ?? 'Erro desconhecido.'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchWeather(city)}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.cityRow}>
            <Ionicons name="location-sharp" size={18} color={theme.textPrimary} />
            <Text style={[styles.city, { color: theme.textPrimary }]}>
              {weather.city}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Ionicons name="search" size={22} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Campo de busca */}
        {showSearch && (
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Ex: Recife, PE"
              placeholderTextColor="#aaa"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
              autoFocus
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        <WeatherCard weather={weather} theme={theme} />

        <HourlyForecast
          forecast={weather.forecast[0]}
          localTime={weather.time}
          conditionSlug={weather.condition_slug}
          theme={theme}
        />

        <NextForecast
          forecast={weather.forecast.slice(1, 6)}
          theme={theme}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scroll: { alignItems: 'center', padding: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 4,
  },
  cityRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  city: { fontSize: 18, fontWeight: '600' },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    marginBottom: 4,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 15,
  },
  searchButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: { color: '#ff6b6b', fontSize: 16, marginBottom: 12 },
  retryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryText: { color: '#fff', fontSize: 14 },
});
