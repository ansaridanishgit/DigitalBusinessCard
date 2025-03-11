import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChildHeader from '../Components/Headers/ChildHeader';

export default function ChooseTheme({ navigation }) {
    return (
        <View style={styles.container}>
            <ChildHeader navigation={navigation} title={'Select Theme'} />
            <Pressable style={{height:'50%'}} onPress={() => navigation.navigate('CardForm')}>
                <Image style={styles.image} source={require('@/assets/images/card1.jpg')}></Image>
                <Text style={styles.text}>Theme 1</Text>
            </Pressable>

            <Pressable style={{height:'50%'}} onPress={() => navigation.navigate('CardForm')}>
                <Image style={styles.image} source={require('@/assets/images/card2.jpg')}></Image>
                <Text style={styles.text}>Theme 2</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    image: {
        width: '40%',
        height: '80%',
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 3,
        borderColor: '#5b5b5b',
        borderRadius: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'center',
        color: '#5b5b5b'
    }
})