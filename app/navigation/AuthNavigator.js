import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import {Login, Signup, Onboarding} from '../screens';

// screen for stack & tabs
const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkOnBoarding();
  }, []);

  return (
    <Stack.Navigator>
      {/* {!viewedOnboarding ? (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        /> */}
      {/* // ) : ( */}
      {/* // <React.Fragment> */}

      {/* {!viewedOnboarding && (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
      )} */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      {/* // </React.Fragment> */}
      {/* // )} */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
