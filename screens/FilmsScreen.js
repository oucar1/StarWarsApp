import React, { useEffect, useState, useRef } from 'react';
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
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const FilmItem = ({ item, index }) => {
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
    navigation.navigate('FilmDetails', { film: item });
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <View style={{ backgroundColor: '#facc15', justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Details →</Text>
        </View>
      )}
      onSwipeableRightOpen={handleSwipe}
    >
      <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
        <View style={styles.row}>
          <Image
            source={require('../assets/images/knight.png')}
            style={styles.icon}
          />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>Director: {item.director}</Text>
            <Text style={styles.subtitle}>Release: {item.release_date}</Text>
          </View>
        </View>
      </Animated.View>
    </Swipeable>
  );
};

export default function FilmsScreen() {
  const [films, setFilms] = useState([]);
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

    fetch("https://www.swapi.tech/api/films")
      .then((res) => res.json())
      .then((data) => {
        const results = data.result || data.results;
        const extracted = results.map((item) =>
          item.properties ? item.properties : item
        );
        setFilms(extracted);
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
    const filteredData = films.filter((film) =>
      film.title.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const renderItem = ({ item, index }) => (
    <FilmItem item={item} index={index} />
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
        placeholder="Search films..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
});
