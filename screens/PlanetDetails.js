// screens/PlanetDetails.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function PlanetDetails({ route }) {
  const { planet } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{planet.name}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Climate:</Text>
        <Text style={styles.value}>{planet.climate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Population:</Text>
        <Text style={styles.value}>{planet.population}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Terrain:</Text>
        <Text style={styles.value}>{planet.terrain}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Gravity:</Text>
        <Text style={styles.value}>{planet.gravity}</Text>
      </View>
      {/* Add more fields as desired */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fafafa',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    width: 120,
  },
  value: {
    flex: 1,
  },
});
