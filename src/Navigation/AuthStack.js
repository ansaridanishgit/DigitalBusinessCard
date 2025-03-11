import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Authentication/SignUp/SignUp'
import WelcomePage from '../Authentication/SignIn/WelcomePage'
import SignIn from '../Authentication/SignIn/SignIn'

const Stack = createStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator initialRouteName="WelcomePage" screenOptions={{headerShown:false}}>
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};
export default AuthStack;