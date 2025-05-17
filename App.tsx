
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomSplashScreen } from './app/components/common/SplashScreen';
import AppNavigator from './app/components/navigation/AppNavigator';
import i18n from './app/i18n';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        // Hide the native splash screen immediately
        await SplashScreen.hideAsync();

        // Simulate minimum loading time for splash screen
        const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

        // Load resources in parallel
        await Promise.all([
          Font.loadAsync({
            'SpaceMono-Regular': require('./assets/fonts/SpaceMono-Regular.ttf'),
            'PlaypenSansArabic-VariableFont_wght': require('./assets/fonts/PlaypenSansArabic-VariableFont_wght.ttf'),
          }),
          i18n.init(),
          minimumLoadingTime, // Ensure splash shows for at least 2 seconds
        ]);

      } catch (e) {
        console.warn(e);
      } finally {
        // Add a fade-out transition
        setTimeout(() => {
          setShowCustomSplash(false);
          setLoadingComplete(true);
        }, 500);
      }
    }

    loadResourcesAndData();
  }, []);
  if (showCustomSplash) {
    return <CustomSplashScreen />;
  }
  if (!isLoadingComplete) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
          <AppNavigator/>
      </SafeAreaProvider>
    </I18nextProvider>
  );
}

export default  App;