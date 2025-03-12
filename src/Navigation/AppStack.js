import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import CreateFirstCard from '../Screens/CreateFirstCard'
import CardForm from '../Screens/CardForm'
import CardDetails from '../Screens/CardDetails'
import QRCode from '../Screens/QRCode'
import CardDetails2 from '../Screens/CardDetails2'
import ChooseTheme from '../Screens/ChooseTheme'
import CardUpdate from '../Screens/CardUpdate'

const Stack = createStackNavigator();

const AppStack = () => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreateFirstCard" component={CreateFirstCard} />
      <Stack.Screen name="CardForm" component={CardForm} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
      <Stack.Screen name="QRCode" component={QRCode} />
      <Stack.Screen name="CardDetails2" component={CardDetails2} />
      <Stack.Screen name="ChooseTheme" component={ChooseTheme} />
      <Stack.Screen name="CardUpdate" component={CardUpdate} />
    </Stack.Navigator>
  );
};
export default AppStack;