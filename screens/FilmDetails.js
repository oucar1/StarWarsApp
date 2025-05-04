import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function FilmDetails({ route }) {
  const { film } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{film.title}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Director:</Text>
        <Text style={styles.value}>{film.director}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Producer:</Text>
        <Text style={styles.value}>{film.producer}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Release Date:</Text>
        <Text style={styles.value}>{film.release_date}</Text>
      </View>
      <Text style={styles.opening}>{film.opening_crawl}</Text>
      {/* add more fields as you like */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fafafa' },
  header:    { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  row:       { flexDirection: 'row', marginBottom: 12 },
  label:     { fontWeight: '600', width: 120 },
  value:     { flex: 1 },
  opening:   { marginTop: 20, fontStyle: 'italic' },
});
