import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';

// Animated component for each spaceship item
const SpaceshipItem = ({ item, index }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100, // Each spaceship appears with a delay
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.model}>Model: {item.model}</Text>
      <Text style={styles.model}>Manufacturer: {item.manufacturer}</Text>
    </Animated.View>
  );
};

export default function SpaceshipsScreen() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/starships")
      .then((res) => res.json())
      .then((data) => {
        const results = data.result || data.results;
        const extracted = results.map((item) =>
          item.properties ? item.properties : item
        );
        setSpaceships(extracted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <SpaceshipItem item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#dbeafe" />
      ) : (
        <FlatList
          data={spaceships}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#dbeafe',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  model: {
    fontSize: 14,
  },
});
