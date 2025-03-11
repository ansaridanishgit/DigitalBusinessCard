import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FIREBASE_Auth } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles2 from '@/src/Components/CSS/AuthStackCss';
import ModalAlert from '@/src/Components/Modals/ModalAlert';
import ModalAccountCreated from '@/src/Components/Modals/ModalAccountCreated';
import Loadercomponent from '@/src/Components/Loader';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modaltitle, setmodaltitle] = useState('');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modaltitle2, setmodaltitle2] = useState('');
  const [Loader, setLoader] = useState(false);

  const auth = FIREBASE_Auth;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    let isValid = true;
  
    setEmailError('');
    setPasswordError('');
    setModalVisible(false);
  
    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }
      if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }
  
    if (isValid) {
      setLoader(true); 
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        setmodaltitle2('Account created successfully!');
        setModalVisible2(true);
      } catch (error) {
        console.log(error.code, error.message);
  
        // Handle Firebase errors
        switch (error.code) {
          case 'auth/email-already-in-use':
            setmodaltitle('This email is already registered');
            break;
          case 'auth/invalid-email':
            setmodaltitle('The email address is not valid.');
            break;
          case 'auth/operation-not-allowed':
            setmodaltitle('Email/password accounts are not enabled. Please contact support.');
            break;
          case 'auth/weak-password':
            setmodaltitle('The password is too weak. Please use a stronger password.');
            break;
          default:
            setmodaltitle('An unexpected error occurred. Please try again later.');
            break;
        }
        setModalVisible(true);
      } finally {
        setLoader(false); 
      }
    }
  };
  return (
      <ScrollView>
    <View style={styles2.container}>
      <Image source={require('@/assets/images/right.png')} style={styles2.rightImage} />
      <Text style={styles2.title}>Create Account</Text>

      <TextInput
        label="Email"
        mode="outlined"
        style={styles2.input}
        activeOutlineColor="#56acff"
        onChangeText={(text) => setEmail(text)}
        value={email}
        outlineStyle={{ borderRadius: 40 }}
      />
      {emailError ? <Text style={styles2.errorText}>{emailError}</Text> : null}

      <TextInput
        label="Password"
        mode="outlined"
        style={styles2.input}
        secureTextEntry
        activeOutlineColor="#56acff"
        onChangeText={(text) => setPassword(text)}
        value={password}
        outlineStyle={{ borderRadius: 40 }}
      />
      {passwordError ? <Text style={styles2.errorText}>{passwordError}</Text> : null}

      <Pressable style={styles2.button} onPress={handleSignUp}>
        <Text style={styles2.buttonText}>Sign Up</Text>
      </Pressable>

      <Text style={styles2.orText}>or sign up with</Text>
      <View style={styles2.socialContainer}>
        <Image source={require('@/assets/images/facebook.png')} style={styles2.socialLogo} />
        <Image source={require('@/assets/images/google.png')} style={styles2.socialLogo} />
        <Image source={require('@/assets/images/apple.png')} style={styles2.socialLogo} />
      </View>

      <View style={styles2.footer}>
        <Text style={styles2.footerText}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles2.loginLink}>Log in</Text>
        </Pressable>
      </View>
      <ModalAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modaltitle}
      />
      <ModalAccountCreated
        visible={modalVisible2}
        onClose={() => setModalVisible2(false)}
        title={modaltitle2}
        navigation={navigation}
      />
      <Loadercomponent Loader={Loader} />
    </View>
      </ScrollView>
  );
}