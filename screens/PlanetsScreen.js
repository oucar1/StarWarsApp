import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Animated,
  Image,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const PlanetItem = ({ item, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSwipe = () => {
    navigation.navigate('PlanetDetails', { planet: item });
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <View style={{ backgroundColor: '#6ee7b7', justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Details →</Text>
        </View>
      )}
      onSwipeableRightOpen={handleSwipe}
    >
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <View style={styles.planetRow}>
          <Image
            source={require('../assets/images/planet.png')}
            style={styles.icon}
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState([]);
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

    fetch('https://www.swapi.tech/api/planets')
      .then(res => res.json())
      .then(data => {
        const results = data.result || data.results;
        const extracted = results.map(item =>
          item.properties ? item.properties : item
        );
        setPlanets(extracted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [isConnected]);

  const filteredPlanets = planets.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.offlineText}>
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
        placeholder="Search planets..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        returnKeyType="search"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        filteredPlanets.length > 0 ? (
          <FlatList
            data={filteredPlanets}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <PlanetItem item={item} index={index} />
            )}
          />
        ) : (
          <Text style={styles.noResultsText}>
            No planets match “{searchTerm}”
          </Text>
        )
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
  offlineText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
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
  planetRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 18,
  },
  noResultsText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});
