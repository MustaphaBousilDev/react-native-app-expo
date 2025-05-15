import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

export const CustomSplashScreen = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const spinValue = new Animated.Value(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scaleValue = new Animated.Value(0.8);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fadeValue = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      // Spin animation
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      // Scale pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
      // Fade in animation
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeValue, scaleValue, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d2d2d', '#1a1a1a']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeValue,
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        {/* Car Icon using shapes */}
        <View style={styles.carIcon}>
          <View style={styles.carBody} />
          <View style={styles.carRoof} />
          <View style={styles.wheel1} />
          <View style={styles.wheel2} />
        </View>
      </Animated.View>

      {/* Loading Spinner */}
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <View style={styles.spinnerInner} />
      </Animated.View>

      {/* App Name */}
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: fadeValue,
          },
        ]}
      >
        Car Rental
      </Animated.Text>

      {/* Loading Text */}
      <Animated.Text
        style={[
          styles.loadingText,
          {
            opacity: fadeValue,
          },
        ]}
      >
        Loading...
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
  },
  carIcon: {
    width: 100,
    height: 60,
    position: 'relative',
  },
  carBody: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 25,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  carRoof: {
    position: 'absolute',
    bottom: 35,
    left: 25,
    right: 25,
    height: 20,
    backgroundColor: '#007AFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  wheel1: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  wheel2: {
    position: 'absolute',
    bottom: 0,
    right: 15,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  spinner: {
    width: 60,
    height: 60,
    marginBottom: 30,
  },
  spinnerInner: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: 'transparent',
    borderTopColor: '#007AFF',
    borderRightColor: '#007AFF',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
});