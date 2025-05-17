import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalizedStyles } from '@/app/hooks/useLocalizedStyles';

export default function LoadingScreen() {
  const { t } = useTranslation();
  const localizedStyles = useLocalizedStyles();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2f95dc" />
      <Text style={[localizedStyles.text, styles.loadingText]}>
        {t('common.loading')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});