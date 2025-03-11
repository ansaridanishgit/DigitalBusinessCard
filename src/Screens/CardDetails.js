import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, StatusBar, Pressable, Alert, ActivityIndicator } from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function CardDetails({ navigation, route }) {
    const { cardData } = route.params;
    const viewShotRef = useRef();
    const [loading, setLoading] = useState(false);

    // Request Media Library Permission
    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please allow media library access to save screenshots.');
            }
        })();
    }, []);

    const captureScreenshot = async () => {
        if (viewShotRef.current) {
            try {
                setLoading(true);

                const uri = await viewShotRef.current.capture();

                // Save to gallery
                const asset = await MediaLibrary.createAssetAsync(uri);
                await MediaLibrary.createAlbumAsync('BusinessCards', asset, false);

                // Share the image
                await Sharing.shareAsync(uri);

                Alert.alert('Success', 'Screenshot saved and ready to share!');
            } catch (error) {
                Alert.alert('Error', 'Failed to capture screenshot. Try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#56acff" barStyle="light-content" translucent={true} />

            <ViewShot ref={viewShotRef} style={{ height: '80%' }}>
                <View style={styles.upperView}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerLeftView}>
                            <Pressable style={styles.backbtnview} onPress={() => navigation.goBack()}>
                                <Image source={require('@/assets/images/back2.png')} style={styles.backbtn} />
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* Profile Image and Name */}
                <Image style={styles.mobilelogo} source={require('@/assets/images/profile.png')} />
                <Text style={styles.userName}>{cardData.name}</Text>
                <Text style={[styles.detailText, { alignSelf: 'center' }]}>{cardData.designation}</Text>

                {/* User Details Section */}
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <View style={[styles.icon2]}>
                            <Image source={require('@/assets/images/mail.png')} style={styles.icon} />
                        </View>
                        <Text style={styles.detailText}>{cardData.email}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <View style={[styles.icon2]}>
                            <Image source={require('@/assets/images/phone.png')} style={styles.icon} />
                        </View>
                        <Text style={styles.detailText}>+91 {cardData.contactNumber}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <View style={[styles.icon2]}>
                            <Image source={require('@/assets/images/company.png')} style={styles.icon} />
                        </View>
                        <Text style={styles.detailText}>{cardData.companyName}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <View style={[styles.icon2]}>
                            <Image source={require('@/assets/images/address.png')} style={styles.icon} />
                        </View>
                        <Text style={styles.detailText}>{cardData.address}</Text>
                    </View>
                </View>
            </ViewShot>
            <Pressable onPress={captureScreenshot}>
                <Text style={{ fontSize: 14, color: '#56acff', alignSelf: 'center', textDecorationLine: 'underline' }}>Share Card</Text>
            </Pressable>
            <Text style={{ fontSize: 14, color: '#5b5b5b', marginVertical: 5, alignSelf: 'center' }}>OR</Text>
            <Pressable onPress={() => navigation.navigate("QRCode", { cardData: cardData })}>
                <Text style={{ fontSize: 14, color: '#56acff', alignSelf: 'center', textDecorationLine: 'underline' }}>Generate QR</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    upperView: {
        width: '100%',
        height: '30%',
        backgroundColor: '#56acff',
    },
    mobilelogoview: {
        paddingTop: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mobilelogo: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginTop: -100,
    },
    userName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#56acff',
        alignSelf: 'center',
        marginTop: 10,
    },
    detailsContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
    icon2: {
        width: 40,
        height: 40,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#56acff'
    },
    detailText: {
        fontSize: 16,
        color: '#5b5b5b',
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
    backbtn: {
        width: 20,
        height: 20,
        tintColor: '#fff'
    },
    backbtnview: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }
});
