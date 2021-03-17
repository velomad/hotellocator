import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';

// Icons
import Icon from 'react-native-vector-icons/AntDesign';
import BookingIcon from 'react-native-vector-icons/Feather';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// screens
import {Account, Bookings, Home, RoomBook} from '../screens';
import Splash from '../screens/Splash';

// Auth navigation
import AuthNavigator from './AuthNavigator';

// Actions
import {setAuthCheckValue} from '../store/action';
import {COLORS, SIZES} from '../constants';

// screen for stack & tabs
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  const getAccessTokenFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@accessToken');
      if (value !== null) {
        // when user is logged in
        props.setAuthCheckValue(true);
      } else {
        // when user is logged out
        setAuthCheckValue(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessTokenFromAsyncStorage();
  }, []);

  function HomeTabs() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: COLORS.blue,
          style: {
            backgroundColor: COLORS.white,
            height: 60,
            paddingBottom: 2,
            paddingTop: 2,
          },
          labelStyle: {fontSize: SIZES.body4},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Icon name="home" size={30} />,
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{
            tabBarIcon: () => <BookingIcon name="list" size={30} />,
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: () => (
              <AccountIcon name="account-cog-outline" size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Bookings':
        return 'Bookings';
      case 'Account':
        return 'My Account';
    }
  }

  return (
    <NavigationContainer>
      {/* {props.isAuth ? ( */}
      {props.value !== null ? (
        <Stack.Navigator>
          <React.Fragment>
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={({route}) => ({
                headerTitle: getHeaderTitle(route),

                headerTitleStyle: {
                  fontSize: SIZES.h2,
                  alignSelf: 'center',
                },
                headerShown: getHeaderTitle(route) === 'Home' ? false : true,
              })}
            />
            <Stack.Screen   
              name="RoomBook"
              component={RoomBook}
              options={{title: 'Book Room', headerTitleAlign: 'center'}}
            />
          </React.Fragment>
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = ({authState}) => ({
  isAuth: authState.isAuth,
});

export default connect(mapStateToProps, {setAuthCheckValue})(AppNavigator);
