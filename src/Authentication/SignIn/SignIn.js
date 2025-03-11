import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FIREBASE_Auth } from '@/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles2 from '@/src/Components/CSS/AuthStackCss';
import ModalAlert from '@/src/Components/Modals/ModalAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loadercomponent from '@/src/Components/Loader';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [Loader, setLoader] = useState(false);
  
  const auth = FIREBASE_Auth;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

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
        setLoader(true)
      try {
        await signInWithEmailAndPassword(auth, email, password);
        await AsyncStorage.setItem("LoginToken", "UserVerified")
    } catch (error) {
        console.log(error.message);

        // Handle Firebase errors
        let errorMessage = 'An error occurred. Please try again.';
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address is not valid.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later.';
            break;
          default:
            errorMessage = 'Failed to sign in. Please check your credentials.';
            break;
        }

        setModalTitle(errorMessage);
        setModalVisible(true);
      }finally {
        setLoader(false); 
      }
    }
  };

  return (
      <ScrollView>
    <View style={styles2.container}>
      <Image source={require('@/assets/images/right.png')} style={styles2.rightImage} />
      <Text style={styles2.title}>Enter Details</Text>

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

      <Pressable style={styles2.button} onPress={handleSignIn}>
        <Text style={styles2.buttonText}>Log in</Text>
      </Pressable>

      <Text style={styles2.orText}>or log in with</Text>
      <View style={styles2.socialContainer}>
        <Image source={require('@/assets/images/facebook.png')} style={styles2.socialLogo} />
        <Image source={require('@/assets/images/google.png')} style={styles2.socialLogo} />
        <Image source={require('@/assets/images/apple.png')} style={styles2.socialLogo} />
      </View>

      <View style={styles2.footer}>
        <Text style={styles2.footerText}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles2.loginLink}>Create Account</Text>
        </Pressable>
      </View>

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
