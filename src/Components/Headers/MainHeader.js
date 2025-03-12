import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, StatusBar } from 'react-native';

export default function CommonHeader({ navigation }) {
    return (
        <View style={styles.header}>
            <StatusBar backgroundColor="#56acff" barStyle="light-content" translucent={true} />
            <View style={styles.headerContent}>
                <View style={styles.headerLeftView}>
                    <View style={{ marginLeft: 25}}>
                        <Text style={styles.address}>Welcome User!</Text>
                    </View>
                </View>
                <View style={styles.headerRightView}>
                    <Pressable onPress={()=>navigation.navigate('Profile')}>
                        <Image source={require('@/assets/images/profile.png')} style={styles.icons} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#56acff',
        justifyContent: 'flex-end',
        height: 50,
        paddingTop: StatusBar.currentHeight,
    },
    headerContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10
    },
    headerLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        width: 35,
        height: 35,
        tintColor:"#fff"
    },
    address: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    headerRightView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        width: 40,
        height: 40,
    },
});