import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {SIZES} from '../../constants/theme';

const InputField = ({
  fieldFocus,
  secure,
  value,
  name,
  placeholder,
  type,
  onChange,
}) => {
  return (
    <View>
      <TextInput
        style={styles.inputStyle}
        placeholderTextColor="#666"
        autoFocus={fieldFocus}
        secureTextEntry={secure}
        defaultValue={value}
        placeholder={placeholder}
        onChangeText={text => onChange({name, type, text})}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputStyle: {
    width: SIZES.width / 1.1,
    height: 50,
    padding: 10,
    marginBottom: 20,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
});
