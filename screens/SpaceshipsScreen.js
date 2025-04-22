import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

export default function SpaceshipsScreen() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/starships")
      .then((res) => res.json())
      .then((data) => {
        setSpaceships(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={spaceships}
          keyExtractor={(item) => item.uid}
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
    backgroundColor: '#ddd',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
  },
});
