import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RTLView from '../components/common/RTLView';
import LanguageSelector from '../components/common/select/LanguageSelect';
import { useLocalizedStyles } from '../hooks/useLocalizedStyles';

export default function HomeScreen() {
  const { t } = useTranslation();
  const localizedStyles = useLocalizedStyles();
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Language Selector for Testing */}
        <LanguageSelector />
        
        {/* Testing Localized Heading */}
        <View style={styles.section}>
          <Text style={localizedStyles.heading}>
            {t('common.welcome')}
          </Text>
          <Text style={localizedStyles.text}>
            {t('home.description', 'This is the home screen description')}
          </Text>
        </View>

        {/* Testing RTL View */}
        <View style={styles.section}>
          <Text style={localizedStyles.heading}>
            {t('home.features', 'Features')}
          </Text>
          
          <RTLView style={styles.featureRow}>
            <View style={styles.featureBox}>
              <Text style={localizedStyles.text}>{t('home.feature1', 'Feature 1')}</Text>
            </View>
            <View style={styles.featureBox}>
              <Text style={localizedStyles.text}>{t('home.feature2', 'Feature 2')}</Text>
            </View>
          </RTLView>
        </View>

        {/* Testing Font Display */}
        <View style={styles.section}>
          <Text style={[localizedStyles.heading, { marginBottom: 10 }]}>
            {t('home.fontTest', 'Font Test')}
          </Text>
          <Text style={localizedStyles.text}>
            English: The quick brown fox jumps over the lazy dog
          </Text>
          <Text style={localizedStyles.text}>
            العربية: الثعلب البني السريع يقفز فوق الكلب الكسول
          </Text>
          <Text style={localizedStyles.text}>
            Français: Le renard brun rapide saute par-dessus le chien paresseux
          </Text>
        </View>

        {/* Testing Dynamic Content Based on Language */}
        <View style={styles.section}>
          <Text style={localizedStyles.heading}>
            {t('home.currentLanguage', 'Current Language')}
          </Text>
          <Text style={localizedStyles.text}>
            {t('home.selectedLanguage', 'You have selected: {{language}}', { 
              language: t('common.languageName', 'English') 
            })}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 30,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureRow: {
    marginTop: 16,
    justifyContent: 'space-between',
  },
  featureBox: {
    flex: 1,
    padding: 16,
    marginHorizontal: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});