import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export const useLocalizedStyles = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return StyleSheet.create({
    text: {
      fontFamily: isArabic ? 'NotoSansArabic-Regular' : 'Poppins-Regular',
      textAlign: isArabic ? 'right' : 'left',
      fontSize: 16,
    },
    heading: {
      fontFamily: isArabic ? 'NotoSansArabic-Bold' : 'Poppins-Bold',
      textAlign: isArabic ? 'right' : 'left',
      fontSize: 24,
    },
    container: {
      flexDirection: isArabic ? 'row-reverse' : 'row',
    },
  });
};