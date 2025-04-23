import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';

// Animated component for each film item
const FilmItem = ({ item, index }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100, // Each film appears with a delay
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>Director: {item.director}</Text>
      <Text style={styles.subtitle}>Release: {item.release_date}</Text>
    </Animated.View>
  );
};

export default function FilmsScreen() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films")
      .then((res) => res.json())
      .then((data) => {
        const results = data.result || data.results;
        const extracted = results.map((item) =>
          item.properties ? item.properties : item
        );
        setFilms(extracted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <FilmItem item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        <FlatList
          data={films}
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
    backgroundColor: '#dbeafe', // Light blue for consistency
    padding: 15,
    marginVertical: 8,
    borderRadius: 12, // Rounded corners
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
});
