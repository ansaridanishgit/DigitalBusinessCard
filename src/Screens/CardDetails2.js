import React from 'react';
import { StyleSheet, View, Image, Text, StatusBar, Pressable } from 'react-native';

export default function CardDetails({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#56acff" barStyle="light-content" translucent={true} />
            <View style={styles.headerContent}>
                <View style={styles.headerLeftView}>
                    <Pressable style={styles.backbtnview} onPress={() => navigation.goBack()}>
                        <Image source={require('@/assets/images/back2.png')} style={styles.backbtn} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.upperView}>
                {/* Profile Image and Name */}
                <Image style={styles.mobilelogo} source={require('@/assets/images/profile.png')} />
                <Text style={styles.userName}>User Name</Text>
                <Text style={[styles.detailText, { alignSelf: 'center', color: '#343434' }]}>Software Engineer</Text>
            </View>

            {/* User Details Section */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <View style={[styles.icon2]}>
                        <Image source={require('@/assets/images/phone.png')} style={styles.icon} />
                    </View>
                    <Text style={styles.detailText}>+91 9876543210</Text>
                </View>
                <View style={styles.detailRow}>
                    <View style={[styles.icon2]}>
                        <Image source={require('@/assets/images/mail.png')} style={styles.icon} />
                    </View>
                    <Text style={styles.detailText}>user@example.com</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>

                <View style={styles.detailRow}>
                    <View style={[styles.icon2]}>
                        <Image source={require('@/assets/images/company.png')} style={styles.icon} />
                    </View>
                    <Text style={styles.detailText}>ABC Pvt Ltd</Text>
                </View>

                <View style={styles.detailRow}>
                    <View style={[styles.icon2]}>
                        <Image source={require('@/assets/images/address.png')} style={styles.icon} />
                    </View>
                    <Text style={styles.detailText}>123, Main Street, City, State</Text>
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate("QRCode")}>
                <Text style={{ fontSize: 14, color: '#56acff', alignSelf: 'center', textDecorationLine: 'underline' }}>Share Card</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343434',
    },
    upperView: {
        width: '100%',
        height: '30%',
        backgroundColor: '#f9a31a',
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
        marginTop: -30,
    },
    userName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#343434',
        alignSelf: 'center',
        marginTop: 10,
    },
    detailsContainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailRow: {
        alignItems: 'center',
        marginBottom: 10,
        width:'50%',
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: '#f9a31a',
    },
    icon2: {
    },
    detailText: {
        fontSize: 16,
        color: '#989898',
        textAlign:'center',
        marginTop:5
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
        tintColor: '#f9a31a'
    },
    backbtnview: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }
});
