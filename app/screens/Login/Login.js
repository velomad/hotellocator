import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import {InputField, Button} from '../../components';
import {COLORS, FONTS} from '../../constants';
import {connect} from 'react-redux';
import {signIn} from '../../store/action';

const Login = props => {
  const [inputValue, setInputValue] = useState({});
  const {username, password} = inputValue;

  const handleChange = e => {
    const {name, type, text} = e;
    setInputValue(prev => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    await props.signIn(inputValue, props.navigation);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              ...FONTS.h1,
              fontWeight: '700',
            }}>
            Welcome,
          </Text>
          <Text style={{...FONTS.body2, color: COLORS.gray, fontWeight: '600'}}>
            Sign in to continue!
          </Text>
        </View>

        <Text
          onPress={() => props.navigation.navigate('Home')}
          style={{
            color: COLORS.gray,
            padding: 10,
            borderRadius: 10,
            textDecorationLine: 'underline',
          }}>
          Skip
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <InputField
          //   fieldFocus={true}
          name="username"
          placeholder="username"
          value={username}
          onChange={handleChange}
        />

        <InputField
          secure={true}
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />

        <Button
          title="Login"
          onPress={handleLogin}
          disable={props.signinIsLoading === true ? true : false}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>
          I am new user,
          <Text
            style={{color: COLORS.blue}}
            onPress={() => props.navigation.navigate('Signup')}>
            {' '}
            Sign Up{' '}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    signinIsLoading: state.authState.signinLoading,
    signinError: state.authState.error,
    token: state.authState.token,
    isAuth: state.authState.isAuth,
  };
};

export default connect(mapStateToProps, {signIn})(Login);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
});
