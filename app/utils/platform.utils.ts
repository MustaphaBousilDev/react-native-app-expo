import Constants from 'expo-constants';
import { I18nManager, Platform } from 'react-native';

export const isRTL = () => I18nManager.isRTL;

export const getDeviceLanguage = () => {
  if (Platform.OS === 'ios') {
    return Constants.systemVersion;
  }
  return Platform.OS;
};

// RTL-aware styling helper
export const rtlStyle = (ltrStyle: any, rtlStyle: any) => {
  return I18nManager.isRTL ? rtlStyle : ltrStyle;
};

// Direction-aware margin/padding
export const directionalStyle = (start: number, end: number) => ({
  marginStart: start,
  marginEnd: end,
  paddingStart: start,
  paddingEnd: end,
});

