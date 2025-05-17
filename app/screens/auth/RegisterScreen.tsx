import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useLocalizedStyles } from '../../hooks/useLocalizedStyles';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};


type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { t } = useTranslation();
  const localizedStyles = useLocalizedStyles();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert(
        t('auth.error'),
        t('auth.allFieldsRequired')
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        t('auth.error'),
        t('auth.passwordsDoNotMatch')
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        t('auth.error'),
        t('auth.passwordTooShort')
      );
      return;
    }

    setLoading(true);
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // No need to navigate - AppNavigator will handle it
    } catch (error) {
      console.log('Register error:', error);
      
      let errorMessage = t('auth.registrationFailed');

      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as { code: unknown }).code === 'string'
      ) {
        const code = (error as { code: string }).code;
        if (code === 'auth/email-already-in-use') {
          errorMessage = t('auth.emailInUse');
        } else if (code === 'auth/invalid-email') {
          errorMessage = t('auth.invalidEmail');
        } else if (code === 'auth/weak-password') {
          errorMessage = t('auth.weakPassword');
        }
      }
      
      Alert.alert(t('auth.error'), errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <Text style={[localizedStyles.heading, styles.title]}>
              {t('auth.createAccount')}
            </Text>
            <Text style={[localizedStyles.text, styles.subtitle]}>
              {t('auth.registerToGetStarted')}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={22} color="#777" style={styles.inputIcon} />
              <TextInput
                style={[localizedStyles.text, styles.input]}
                placeholder={t('auth.fullName')}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={22} color="#777" style={styles.inputIcon} />
              <TextInput
                style={[localizedStyles.text, styles.input]}
                placeholder={t('auth.email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={22} color="#777" style={styles.inputIcon} />
              <TextInput
                style={[localizedStyles.text, styles.input]}
                placeholder={t('auth.password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPasswordButton}
              >
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#777" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={22} color="#777" style={styles.inputIcon} />
              <TextInput
                style={[localizedStyles.text, styles.input]}
                placeholder={t('auth.confirmPassword')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.registerButtonText}>{t('auth.signUp')}</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={localizedStyles.text}>{t('auth.alreadyHaveAccount')} </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[localizedStyles.text, styles.loginText]}>
                {t('auth.signIn')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 24,
    fontSize: 16,
    color: '#333',
  },
  showPasswordButton: {
    padding: 4,
  },
  registerButton: {
    backgroundColor: '#2f95dc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#2f95dc',
    fontWeight: '600',
  },
});