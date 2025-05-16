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
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useLocalizedStyles } from '@/app/hooks/useLocalizedStyles';
import { auth } from '@/app/config/firebase.config';

export default function LoginScreen({ navigation }) {
    const { t } = useTranslation();
    const localizedStyles = useLocalizedStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(
                t('auth.error'),
                t('auth.emptyFields')
            );
            return;
        }
        setLoading(true);
        try { 
            await signInWithEmailAndPassword(auth, email, password);
        } catch(error: any) {
            console.log('Login error: ', error);
            let errorMessage = t('auth.loginFailed');
            if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
                errorMessage = t('auth.invalidCredentials')
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = t('auth.invalidEmail')
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = t('auth.tooManyAttempts');
            }
            Alert.alert(t('auth.error'), errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
       <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Text style={[localizedStyles.heading, styles.title]}>
                    {t('auth.welcomeBack')}
                    </Text>
                    <Text style={[localizedStyles.text, styles.subtitle]}>
                    {t('auth.signInToContinue')}
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
                    <TouchableOpacity 
                      style={styles.forgotPasswordButton}
                      onPress={() => navigation.navigate('ForgotPassword')}
                    >
                      <Text style={[localizedStyles.text, styles.forgotPasswordText]}>
                        {t('auth.forgotPassword')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={handleLogin}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                      ) : (
                        <Text style={styles.loginButtonText}>{t('auth.signIn')}</Text>
                      )}
                    </TouchableOpacity>
                </View>
                <View style={styles.registerContainer}>
                    <Text style={localizedStyles.text}>{t('auth.dontHaveAccount')} </Text>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Register')}
                    >
                    <Text style={[localizedStyles.text, styles.registerText]}>
                        {t('auth.signUp')}
                    </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
       </SafeAreaView>
    )
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
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#2f95dc',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#2f95dc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#2f95dc',
    fontWeight: '600',
  },
});