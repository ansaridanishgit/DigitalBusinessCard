import React, { useState } from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import CommonHeader from '../Components/Headers/MainHeader';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <CommonHeader navigation={navigation} />
      <Pressable onPress={()=>navigation.navigate('CardDetails')} style={styles.cardView}>
        <Image source={require('@/assets/images/plus.png')} style={{ width: 30, height: 30, marginRight:15, tintColor:'#56acff' }} />
        <View style={{}}>
          <Text style={{fontSize:16, fontWeight:'600', color:'#56acff'}}>Name</Text>
          <Text style={{fontSize:14, fontWeight:'600', color:'#5b5b5b'}}>Company Name</Text>
        </View>
      </Pressable>
      <View style={styles.btmView}>
        <Pressable style={styles.btmRight} onPress={() => { navigation.navigate("ChooseTheme") }}>
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
}

});
