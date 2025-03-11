import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FIREBASE_Auth } from '@/FirebaseConfig';

export default function Profile({ navigation }) {
    return (
        <View style={[styles.childcontainer, { paddingTop: 10, padding: 20 }]}>
            <StatusBar barStyle={'dark-content'} backgroundColor='#f5f5f7' />
            <ScrollView>
                <Pressable style={styles.backbtn} onPress={() => navigation.goBack()}>
                    <Image style={styles.backbtn} source={require('@/assets/images/back2.png')} />
                </Pressable>
                <View style={[styles.mobilelogoview,{marginTop:20}]}>
                    <Image style={styles.mobilelogo} source={require('@/assets/images/main.png')} />
                    <Text style={styles.userName}>User Name</Text>
                    <Text style={styles.userId}>User Email</Text>
                </View>

                <View style={[styles.mobilelogoview,{marginTop:20}]}>
                    <Pressable style={styles.options}>
                        <Image style={styles.backbtn} source={require('@/assets/images/setting.png')} />
                        <Text style={styles.optionstxt}>Settings</Text>
                    </Pressable>
                </View>
                <View style={styles.mobilelogoview}>
                    <Pressable onPress={()=> FIREBASE_Auth.signOut()} style={styles.options}>
                        <Image style={styles.backbtn} source={require('@/assets/images/logout.png')} />
                        <Text style={styles.optionstxt}>Log out</Text>
                    </Pressable>
                </View>
            </ScrollView>

        </View>
    );
}
const styles = StyleSheet.create({
    childcontainer: {
        flex: 1,
        backgroundColor: '#f5f5f7',
    },
    mobilelogoview: {
        paddingTop: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mobilelogo: {
        width: 80,
        height: 80,
    },
    userName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#5b5b5b',
        marginTop: 15,
    },
    userId: {
        fontSize: 15,
        fontWeight: '400',
        color: '#5b5b5b',
        marginTop: 5,
    },
    backbtn: {
        width: 20,
        height: 20,
        tintColor: '#5b5b5b',
    },
    options: {
        width: '85%',
        height: 40,
        backgroundColor: '#e6eefa',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    optionstxt: {
        fontSize: 15,
        color: '#5b5b5b',
        fontWeight: '600',
        marginLeft: 15,
    },
});