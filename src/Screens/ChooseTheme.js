import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ChildHeader from '../Components/Headers/ChildHeader';

export default function ChooseTheme({ navigation }) {
    const [selectedTheme, setSelectedTheme] = useState(null);

    const handleThemeSelection = (theme) => {
        setSelectedTheme(theme);
        navigation.navigate('CardForm', { theme:theme });
    };
    return (
        <View style={styles.container}>
            <ChildHeader navigation={navigation} title={'Select Theme'} />
            <Pressable style={{height:'40%'}} onPress={() => handleThemeSelection('Theme1')}>
                <Image style={styles.image} source={require('@/assets/images/card1.jpg')}></Image>
                <Text style={styles.text}>Theme 1</Text>
            </Pressable>

            <Pressable style={{height:'40%'}} onPress={() => handleThemeSelection('Theme2')}>
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
        borderRadius: 10,
        resizeMode:'cover'
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'center',
        color: '#5b5b5b'
    }
})