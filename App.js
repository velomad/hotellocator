import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import {Provider} from 'react-redux';
import Store from './app/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from './app/screens/Splash';

const App = () => {
  const [state, setState] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    checkToken();
    setTimeout(() => {
      // some stuff got loaded
      setState(true);
    }, 1000);
  }, []);

  const checkToken = async () => {
    const result = await AsyncStorage.getItem('@accessToken');
    setValue(result);
  };

  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        {!state ? <Splash /> : <AppNavigator value={value} />}
      </SafeAreaProvider>
    </Provider>
  );
};

export default () => {
  return <App />;
};
