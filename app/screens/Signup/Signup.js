import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {InputField, Button} from '../../components';
import {COLORS, FONTS} from '../../constants';

const Signup = ({navigation}) => {
  const [inputValue, setInputValue] = useState({username: ''});
  const {username, password} = inputValue;

  const handleChange = (e) => {
    const {name, type, text} = e;
    setInputValue((prev) => ({
      ...prev,
      [name]: text,
    }));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            ...FONTS.h1,
            fontWeight: '700',
          }}>
          Create Account,
        </Text>
        <Text style={{...FONTS.body2, color: COLORS.gray, fontWeight: '600'}}>
          Sign up to get started!
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

        <InputField
          secure={true}
          name="password"
          placeholder="Repeat password"
          value={password}
          onChange={handleChange}
        />

        <Button title="Sign up" />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>
          Already a user,
          <Text
            style={{color: COLORS.blue}}
            onPress={() => navigation.navigate('Login')}>
            {' '}
            Login in{' '}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
});
