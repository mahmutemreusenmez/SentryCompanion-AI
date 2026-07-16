import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import './src/i18n/i18n';
import { PatientProvider } from './src/context/PatientContext';

import DashboardScreen from './src/screens/DashboardScreen';
import LoginScreen from './src/screens/LoginScreen';
import HekimNobetiScreen from './src/screens/HekimNobetiScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LanguageSelector() {
  const { i18n } = useTranslation();
  return (
    <View style={styles.langContainer}>
      <Button title="TR" onPress={() => i18n.changeLanguage('tr')} />
      <Button title="EN" onPress={() => i18n.changeLanguage('en')} />
      <Button title="AR" onPress={() => i18n.changeLanguage('ar')} />
    </View>
  );
}

// Profil (Hekim) sekmesi için Stack
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Profil Girişi' }} />
      <Stack.Screen name="HekimNobeti" component={HekimNobetiScreen} options={{ title: 'HekimNöbeti' }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Canlı Görüşme (Hekim)' }} />
    </Stack.Navigator>
  );
}

// Ana Sayfa sekmesi için Stack
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Ana Sayfa' }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Canlı Destek' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PatientProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <LanguageSelector />
          <Tab.Navigator>
            <Tab.Screen 
              name="HomeTab" 
              component={HomeStack} 
              options={{ title: 'Ana Sayfa', headerShown: false }} 
            />
            <Tab.Screen 
              name="ProfileTab" 
              component={ProfileStack} 
              options={{ title: 'Profil', headerShown: false }} 
            />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </PatientProvider>
  );
}

const styles = StyleSheet.create({
  langContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    gap: 10
  }
});
