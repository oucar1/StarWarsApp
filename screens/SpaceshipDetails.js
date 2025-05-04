import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function SpaceshipDetails({ route }) {
  const { spaceship } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{spaceship.name}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Model:</Text>
        <Text style={styles.value}>{spaceship.model}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Manufacturer:</Text>
        <Text style={styles.value}>{spaceship.manufacturer}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Cost:</Text>
        <Text style={styles.value}>{spaceship.cost_in_credits} credits</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Crew:</Text>
        <Text style={styles.value}>{spaceship.crew}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Passengers:</Text>
        <Text style={styles.value}>{spaceship.passengers}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Starship Class:</Text>
        <Text style={styles.value}>{spaceship.starship_class}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fafafa' },
  header:    { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  row:       { flexDirection: 'row', marginBottom: 12 },
  label:     { fontWeight: '600', width: 140, color: '#374151' },
  value:     { flex: 1, color: '#111827' },
});
