import { auth } from '@/app/config/firebase.config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

import LoginScreen from '@/app/screens/auth/LoginScreen';
import LoadingScreen from '../common/LoadingScreen';
import TabNavigator from './TabNavigator';
import RegisterScreen from '@/app/screens/auth/RegisterScreen';
import ForgotPasswordScreen from '@/app/screens/auth/ForgotPasswordScreen';

const Stack = createStackNavigator()

//creating screens for unauthentication
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}


//App stack for screens for authenticated users
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}