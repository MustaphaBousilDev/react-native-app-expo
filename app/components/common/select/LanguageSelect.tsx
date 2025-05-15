import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/app/i18n/index';
import { Ionicons } from '@expo/vector-icons';

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    const languages = [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    ];
    const selectLanguage = async (langCode: string) => {
        if (langCode === 'ar' && i18n.language !== 'ar') {
            // Show alert for RTL change
            Alert.alert(
                t('common.languageChange'),
                t('common.rtlChangeMessage'),
                [
                {
                    text: t('common.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('common.confirm'),
                    onPress: async () => {
                    await changeLanguage(langCode);
                    },
                },
                ]
            );
        } else if (i18n.language === 'ar' && langCode !== 'ar') {
            // Changing from RTL to LTR
            Alert.alert(
                t('common.languageChange'),
                t('common.ltrChangeMessage'),
                [
                {
                    text: t('common.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('common.confirm'),
                    onPress: async () => {
                    await changeLanguage(langCode);
                    },
                },
                ]
            );
        } else {
            await changeLanguage(langCode);
        }
    }
    return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('common.language')}</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            i18n.language === lang.code && styles.selectedLanguage,
          ]}
          onPress={() => selectLanguage(lang.code)}
        >
          <View style={styles.languageInfo}>
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text
              style={[
                styles.languageText,
                i18n.language === lang.code && styles.selectedText,
              ]}
            >
              {lang.nativeName}
            </Text>
          </View>
          {i18n.language === lang.code && (
            <Ionicons name="checkmark" size={24} color="#007AFF" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedLanguage: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  languageText: {
    fontSize: 16,
  },
  selectedText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LanguageSelector;