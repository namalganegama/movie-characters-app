import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { getCharacter } from '../store/reducers/characterSlice';
import { useEffect, useState } from 'react';
import React from 'react';

interface Character {
  id: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: number;
  image: string;
}

const Characters = ({ navigation }: { navigation: any }) => {
  const [selectedItem, setSelectedItem] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const dispatch = useDispatch<any>();

  const selectItem = (item: any) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    dispatch(getCharacter()).then((response: any) => {
      setData(response.payload);
      setLoading(false);
    });
  }, [dispatch]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => selectItem(item)} style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.title}> {item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const closeCardView = () => {
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD482" />
      ) : (
        <React.Fragment>
         <TouchableOpacity onPress={() => navigation.navigate('profile')} style={styles.wheelStyle}>
           <Image source={require('../assets/cogwheel.png')} style={styles.wheelImage} />
         </TouchableOpacity>
          
          <FlatList
            style={styles.flatList}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </React.Fragment>
      )}

      {selectedItem && (
        <View style={styles.cardView}>
          <Text style={styles.cardTitle}>{selectedItem.fullName}</Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedItem.imageUrl }} style={styles.cardImage} />
          </View>
          <Text style={styles.cardText}>ID: {selectedItem.id}</Text>
          <Text style={styles.cardText}>First Name: {selectedItem.firstName}</Text>
          <Text style={styles.cardText}>Last Name: {selectedItem.lastName}</Text>
          <Text style={styles.cardText}>Full Name: {selectedItem.fullName}</Text>
          <Text style={styles.cardText}>Title: {selectedItem.title}</Text>
          <Text style={styles.cardText}>Family: {selectedItem.family}</Text>
          <TouchableOpacity onPress={closeCardView} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
  },
  flatList: {
    marginTop: 100
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
  },
  title: {
    marginTop: 4,
    fontSize: 14,
    color: '#000000',
  },
  cardView: {
    position: 'absolute',
    alignContent: 'center',
    top: '20%',
    left: '10%',
    right: '10%',
    backgroundColor: '#e3e3e3',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  cardImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000000',
  },
  closeButton: {
    backgroundColor: '#FFD482',
    borderRadius: 10,
    height: 38,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  wheelImage: { 
    height: 40, 
    width: 40, 
    tintColor: '#FFF' 
  },
  wheelStyle: {
    position: 'absolute',
    top: 50,
    right: 30,
    tintColor: '#FFF',
    zIndex: 10,
  },
});

export default Characters;
