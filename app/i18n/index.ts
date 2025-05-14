import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import ar from './expo-locales/ar.json';
import en from './expo-locales/en.json';
import fr from './expo-locales/fr.json';
import * as Updates from 'expo-updates';


const resources = {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar }
}

const LANG_CODES = Object.keys(resources)

const LANGUAGE_DETECTOR = {
    type: 'languageDetector' as const,
    async: true,
    detect: async (callback: (lang: string) => void) => {
        try {
            const storedLanguage = await AsyncStorage.getItem('user-language');
            if (storedLanguage) {
                callback(storedLanguage)
                return;
            }
            // Get device local
            const deviceLocale = Localization.locale;
            const languageCode = deviceLocale.split('-')[0] // extract the language
            //check if we supperted this language
            if(LANG_CODES.includes(languageCode)) {
                callback(languageCode)
            } else {
                callback('en'); //- fallback to english
            }
        } catch (error) {
            console.error('Error detecting language: ', error);
            callback('en');
        }
    },
    init: () => {},
    cacheUserLanguage: async (language: string) => {
        try {
            await AsyncStorage.setItem('user-language', language)
        } catch(error) {
            console.error('Error caching language: ', error)
        }
    }
}

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(LANGUAGE_DETECTOR)
.use(initReactI18next)
.init({
    resources,
    fallbackLng: 'en',
    debug: __DEV__, // Enable debug in development
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    }
})

//Handle RTL for Arabic 
export const changeLanguage = async (language: string) =>  {
    try {
        // eslint-disable-next-line import/no-named-as-default-member
        await i18n.changeLanguage(language);
        const isRTL = language === 'ar';
        const currentRTL = I18nManager.isRTL;
        if(currentRTL !== isRTL) {
           // For Expo, we need to force RTL and reload the app
           I18nManager.allowRTL(true);
           I18nManager.forceRTL(isRTL);

           // In  expo, we reload the app instead of restart
           await Updates.reloadAsync();
        }
    } catch (error) {
        console.error('Error changing language: ', error)
    }
}

export default i18n;