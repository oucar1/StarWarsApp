import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  Button,
  Animated,
} from 'react-native';

// Animated component for each planet item
const PlanetItem = ({ item, index }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100, // Each planet appears with a delay
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.item, { opacity: fadeAnim }]}>
      <Text style={styles.name}>{item.name}</Text>
    </Animated.View>
  );
};

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState('');

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then((res) => res.json())
      .then((data) => {
        const results = data.result || data.results;
        const extracted = results.map((item) =>
          item.properties ? item.properties : item
        );
        setPlanets(extracted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setSubmittedText(searchTerm);
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <PlanetItem item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search planets..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>You searched for:</Text>
            <Text style={styles.modalText}>{submittedText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        <FlatList
          data={planets}
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
  name: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 18,
  },
});
