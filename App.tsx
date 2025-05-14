import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import 'react-native-gesture-handler';
import TabNavigator from './app/components/navigation/TabNavigator';


export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}