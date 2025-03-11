import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChildHeader from '../Components/Headers/ChildHeader';

export default function QRCode({navigation}) {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <ChildHeader navigation={navigation} title={'QR Code'}/>
            <View style={styles.qrContainer}>

            </View>
            <Text style={{ fontSize: 17, alignSelf: 'center', marginTop: 10, color:"#5b5b5b" }}>Scan this QR to receive business card</Text>
            <Pressable onPress={() => navigation.navigate("")}>
                <Text style={{ fontSize: 14, color: '#56acff', alignSelf: 'center', textDecorationLine: 'underline' }}>Share QR</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    qrContainer: {
        width: 250,
        height: 250,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10
    }
})