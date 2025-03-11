import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg'; 
import ChildHeader from '../Components/Headers/ChildHeader';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function QRCodeScreen({ navigation, route }) {
    const { firestoreLink } = route.params;
    const viewShotRef = useRef();
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Request permission for Media Library
    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setPermissionGranted(status === 'granted');
        })();
    }, []);

    const captureScreenshot = async () => {
        if (!permissionGranted) {
            Alert.alert('Permission Required', 'Please allow media storage permission.');
            return;
        }

        if (viewShotRef.current) {
            try {
                const uri = await viewShotRef.current.capture();

                const asset = await MediaLibrary.createAssetAsync(uri);
                await MediaLibrary.createAlbumAsync('CouponScreenshots', asset, false);

                setLoading(true);
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(uri);
                } else {
                    Alert.alert("Sharing not available", "Your device doesn't support sharing.");
                }
                setLoading(false);
            } catch (error) {
                console.error('Error capturing or sharing screenshot:', error);
            }
        }
    };

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <ChildHeader navigation={navigation} title={'QR Code'} />
            <ViewShot ref={viewShotRef}>
                <View style={styles.qrContainer}>
                    <QRCode
                        value={firestoreLink}
                        size={250}
                        color="#000"
                        backgroundColor="#fff"
                    />
                </View>
            </ViewShot>

            <Text style={{ fontSize: 17, alignSelf: 'center', marginTop: 10, color: "#5b5b5b" }}>
                Scan this QR to receive business card
            </Text>

            <Pressable onPress={captureScreenshot}>
                <Text style={{ fontSize: 14, color: '#56acff', alignSelf: 'center', textDecorationLine: 'underline', marginTop: 5 }}>
                    {loading ? 'Sharing...' : 'Share QR'}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    qrContainer: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 10
    }
});
