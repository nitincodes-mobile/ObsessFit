import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FitnessProvider } from './src/context/FitnessContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/locales/i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <FitnessProvider>
          <AppNavigator />
        </FitnessProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  );
}

export default App;
