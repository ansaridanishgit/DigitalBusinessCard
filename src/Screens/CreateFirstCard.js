import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styles2 from '@/src/Components/CSS/AuthStackCss';

export default function CreateFirstCard({ navigation }) {
    return (
        <ScrollView>
            <View style={styles2.container}>
                <View style={styles.centerView}>
                    <Image source={require('@/assets/images/right.png')} style={styles2.rightImage} />
                    <Text style={styles.titleText}>Add your first Business Card</Text>
                    <Text style={styles.subtitleText}>{"Create, Customize, and Share\nyour Digital Business Card"}</Text>
                    <View style={styles.dotContainer}>
                        <View style={[styles.dot, { backgroundColor: '#ccc' }]}></View>
                        <View style={[styles.dot, { backgroundColor: '#ccc' }]}></View>
                        <View style={[styles.dot, { backgroundColor: '#0077cc' }]}></View>
                    </View>
                </View>
                <View style={styles.btmView}>
                    <Pressable style={styles.btmRight} onPress={() => { navigation.navigate("CardForm") }}>
                        <Image source={require('@/assets/images/plus.png')} style={styles.nextIcon} />
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    centerView: {
        width: '80%',
        marginTop: -100,
        padding: 20,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
    },
    subtitleText: {
        fontSize: 16,
        color: '#7a7a7a',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 22,
    },
    dotContainer: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        marginHorizontal: 5,
        borderRadius: 50,
    },
    btmView: {
        width: '100%',
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    },
    btmRight: {
        width: 80,
        height: 80,
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
        width: 40,
        height: 40,
        tintColor: '#fff',
    },
});
