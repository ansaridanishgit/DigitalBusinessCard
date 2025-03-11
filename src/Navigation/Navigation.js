import React, { useEffect, useState } from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_Auth } from '@/FirebaseConfig';

const Navigation = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_Auth, (user) => {
      console.log("User state change detected:", user);
      setUser(user || null)
    });

    return () => unsubscribe();
  }, []);

  return <>{user ? <AppStack /> : <AuthStack />}</>;
};
export default Navigation;