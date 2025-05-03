import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Image,
  TextInput,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const SpaceshipItem = ({ item, index }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
      <View style={styles.row}>
        <Image
          source={require('../assets/images/rocket.png')}
          style={styles.icon}
        />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.model}>Model: {item.model}</Text>
          <Text style={styles.model}>Manufacturer: {item.manufacturer}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default function SpaceshipsScreen() {
  const [spaceships, setSpaceships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setLoading(false);
      return;
    }

    fetch("https://www.swapi.tech/api/starships")
      .then((res) => res.json())
      .then((data) => {
        const results = data.result || data.results;
        const extracted = results.map((item) =>
          item.properties ? item.properties : item
        );
        setSpaceships(extracted);
        setFiltered(extracted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [isConnected]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filteredData = spaceships.filter((ship) =>
      ship.name.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const renderItem = ({ item, index }) => (
    <SpaceshipItem item={item} index={index} />
  );

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, color: 'red', textAlign: 'center', marginTop: 20 }}>
          No internet connection. Please check your network settings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/starwars.jpg')}
        style={styles.headerLogo}
      />

      <TextInput
        style={styles.input}
        placeholder="Search spaceships..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#dbeafe" />
      ) : (
        <FlatList
          data={filtered}
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
  headerLogo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  item: {
    backgroundColor: '#dbeafe',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  model: {
    fontSize: 14,
  },
});
