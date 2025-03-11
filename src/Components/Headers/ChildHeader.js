import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, StatusBar } from 'react-native';

export default function ChildHeader({ navigation, title }) {
    return (
        <View style={styles.header}>
            <StatusBar backgroundColor="#56acff" barStyle="light-content" translucent={true} />
            <View style={styles.headerContent}>
                <View style={styles.headerLeftView}>
                <Pressable style={styles.backbtnview} onPress={() => navigation.goBack()}> 
                    <Image source={require('@/assets/images/back2.png')} style={styles.backbtn} />
                </Pressable>
                        <Text style={styles.address}>{title}</Text>
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
    
    backbtn: {
        width: 20,
        height: 20,
        tintColor: 'white'
    },
    backbtnview: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10
    }
});