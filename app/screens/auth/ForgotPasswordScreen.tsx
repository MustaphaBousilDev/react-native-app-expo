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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useLocalizedStyles } from '../../hooks/useLocalizedStyles';

import type { StackNavigationProp } from '@react-navigation/stack';

type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const { t } = useTranslation();
  const localizedStyles = useLocalizedStyles();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert(
        t('auth.error'),
        t('auth.emailRequired')
      );
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      
      Alert.alert(
        t('auth.success'),
        t('auth.resetEmailSent'),
        [
          {
            text: t('common.ok'),
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      console.log('Reset password error:', error);
      
      let errorMessage = t('auth.resetPasswordFailed');
      
      if (typeof error === 'object' && error !== null && 'code' in error) {
        if ((error as { code: string }).code === 'auth/user-not-found') {
          errorMessage = t('auth.userNotFound');
        } else if ((error as { code: string }).code === 'auth/invalid-email') {
          errorMessage = t('auth.invalidEmail');
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
              {t('auth.forgotPassword')}
            </Text>
            <Text style={[localizedStyles.text, styles.subtitle]}>
              {t('auth.resetPasswordDescription')}
            </Text>
          </View>

          <View style={styles.formContainer}>
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

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.resetButtonText}>{t('auth.resetPassword')}</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={localizedStyles.text}>{t('auth.rememberPassword')} </Text>
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
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 24,
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
  resetButton: {
    backgroundColor: '#2f95dc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
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