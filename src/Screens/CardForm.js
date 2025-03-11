import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FIREBASE_Auth } from '@/FirebaseConfig';
import styles2 from '@/src/Components/CSS/AuthStackCss';
import ModalAlert from '@/src/Components/Modals/ModalAlert';
import Loadercomponent from '@/src/Components/Loader';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_APP, FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

export default function CardForm({ navigation }) {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  const [nameError, setNameError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [contactError, setContactError] = useState('');
  const [designationError, setDesignationError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [Loader, setLoader] = useState(false);

  const auth = FIREBASE_Auth;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContactNumber = (number) => {
    const contactRegex = /^[0-9]{10}$/;  // Only 10-digit numbers
    return contactRegex.test(number);
  };

  const handleSignIn = async () => {
    let isValid = true;

    // Reset Errors
    setNameError('');
    setCompanyNameError('');
    setContactError('');
    setDesignationError('');
    setEmailError('');
    setAddressError('');

    // Validations
    if (!name) { setNameError('Name is required.'); isValid = false; }
    if (!companyName) { setCompanyNameError('Company Name is required.'); isValid = false; }
    if (!contactNumber) { setContactError('Contact Number is required.'); isValid = false; }
    if (!validateContactNumber(contactNumber)) { setContactError('Please enter a valid 10-digit number.'); isValid = false; }
    if (!designation) { setDesignationError('Designation is required.'); isValid = false; }
    if (!email) { setEmailError('Email is required.'); isValid = false; }
    if (!validateEmail(email)) { setEmailError('Please enter a valid email address.'); isValid = false; }
    if (!address) { setAddressError('Address is required.'); isValid = false; }

    if (isValid) {
      setLoader(true);

      try {
        const imageURL = image ? await uploadImage(image, 'businessCards') : null;
        const logoURL = companyLogo ? await uploadImage(companyLogo, 'companyLogos') : null;
        console.log("jjjjjj")

        const docRef = await addDoc(collection(FIREBASE_DB, "Cards"), {
          name: name || '',
          companyName: companyName || '',
          contactNumber: contactNumber || '',
          designation: designation || '',
          email: email || '',
          address: address || '',
        });

        Alert.alert('Success', 'Card created successfully!');
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Error', 'Failed to create card. Please try again.');
      } finally {
        setLoader(false);
      }
    }
  };

  const openGallery = async () => {
    try {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.3,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        setIsPhotoUploaded(true);
      } else {
        Alert.alert('Error', 'No image selected.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };


  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required to upload images.');
      return false;
    }
    return true;
  };
  const openCompanyLogoGallery = async () => {
    try {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.3,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCompanyLogo(result.assets[0].uri);
      } else {
        Alert.alert('Error', 'No company logo selected.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select logo. Please try again.');
    }
  };
  const uploadImage = async (uri, folderName) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `${folderName}/${Date.now()}`);

      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef); // Return the uploaded image URL
    } catch (error) {
      Alert.alert('Error', 'Image upload failed.');
      return null;
    }
  };

  return (
    <ScrollView>
      <View style={styles2.container}>
        <Text style={styles2.title}>Create Your First Business Card</Text>

        {/* Name */}
        <TextInput
          label="Name"
          mode="outlined"
          style={styles2.input}
          onChangeText={setName}
          value={name}
          outlineStyle={{ borderRadius: 40 }}
        />
        {nameError ? <Text style={styles2.errorText}>{nameError}</Text> : null}

        {/* Company Name */}
        <TextInput
          label="Company Name"
          mode="outlined"
          style={styles2.input}
          onChangeText={setCompanyName}
          value={companyName}
          outlineStyle={{ borderRadius: 40 }}
        />
        {companyNameError ? <Text style={styles2.errorText}>{companyNameError}</Text> : null}

        {/* Contact Number */}
        <TextInput
          label="Contact Number"
          mode="outlined"
          keyboardType="numeric"
          style={styles2.input}
          onChangeText={setContactNumber}
          value={contactNumber}
          outlineStyle={{ borderRadius: 40 }}
          maxLength={10}
        />
        {contactError ? <Text style={styles2.errorText}>{contactError}</Text> : null}

        {/* Designation */}
        <TextInput
          label="Designation"
          mode="outlined"
          style={styles2.input}
          onChangeText={setDesignation}
          value={designation}
          outlineStyle={{ borderRadius: 40 }}
        />
        {designationError ? <Text style={styles2.errorText}>{designationError}</Text> : null}

        {/* Email */}
        <TextInput
          label="Email"
          mode="outlined"
          style={styles2.input}
          onChangeText={setEmail}
          value={email}
          outlineStyle={{ borderRadius: 40 }}
        />
        {emailError ? <Text style={styles2.errorText}>{emailError}</Text> : null}

        {/* Address */}
        <TextInput
          label="Address"
          mode="outlined"
          style={styles2.input}
          multiline
          numberOfLines={3}
          onChangeText={setAddress}
          value={address}
          outlineStyle={{ borderRadius: 20 }}
        />
        {addressError ? <Text style={styles2.errorText}>{addressError}</Text> : null}

        <View style={styles.imageView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 17, color: '#5b5b5b', marginRight: 10 }}>
              {isPhotoUploaded ? 'Photo Captured' : 'Upload photo'}
            </Text>
            {isPhotoUploaded ?
              <Image style={styles.icon} source={require('@/assets/images/correct.png')}></Image>
              : null}
          </View>
          <Pressable
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
            onPress={openGallery}
          >
            <Image
              style={styles.icon}
              source={require('@/assets/images/camera.png')}
            />
          </Pressable>

        </View>
        <View style={styles.imageView}>
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 17, color: '#5b5b5b', marginRight: 10 }}>
              {companyLogo ? 'Logo Uploaded' : 'Upload Company Logo'}
            </Text>
            {companyLogo ? (
              <Image style={styles.icon} source={require('@/assets/images/correct.png')} />
            ) : null}
          </View>

          <Pressable
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
            onPress={openCompanyLogoGallery}
          >
            <Image
              style={styles.icon}
              source={require('@/assets/images/camera.png')}
            />
          </Pressable>
        </View>

        {/* Submit Button */}
        <Pressable style={styles2.button} onPress={()=>navigation.navigate("Home")}>
          <Text style={styles2.buttonText}>Create Card</Text>
        </Pressable>

        {/* Modal for Error Messages */}
        <ModalAlert
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={modalTitle}
        />

        <Loadercomponent Loader={Loader} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  imageView: {
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#5b5b5b',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
    backgroundColor: "#ffffff"
  },
  // icon
  icon: {
    width: 25,
    height: 25,
    tintColor: '#56acff'
  },
})