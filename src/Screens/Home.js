import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable, Text, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig';
import CommonHeader from '../Components/Headers/MainHeader';

export default function Home({ navigation }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "Cards"));
        const fetchedCards = [];
        querySnapshot.forEach((doc) => {
          fetchedCards.push({ id: doc.id, ...doc.data() });
        });
        setCards(fetchedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleCardPress = (item) => {
    if (item.theme === 'Theme1') {
      navigation.navigate('CardDetails', { cardData: item });
    } else if (item.theme === 'Theme2') {
      navigation.navigate('CardDetails2', { cardData: item });
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader navigation={navigation} />

      {loading ? (
        <ActivityIndicator size="large" color="#56acff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleCardPress(item)}
              style={styles.cardView}
            >
              <Image
                source={require('@/assets/images/company.png')}
                style={{ width: 30, height: 30, marginRight: 15, tintColor: '#56acff' }}
              />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.companyName}>{item.companyName}</Text>
              </View>
            </Pressable>
          )}
        />
      )}

      <View style={styles.btmView}>
        <Pressable
          style={styles.btmRight}
          onPress={() => navigation.navigate("ChooseTheme")}
        >
          <Image source={require('@/assets/images/plus.png')} style={styles.nextIcon} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  btmView: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  btmRight: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#56acff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  nextIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  cardView: {
    width: '90%',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#56acff',
  },
  companyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5b5b5b',
  },
});
