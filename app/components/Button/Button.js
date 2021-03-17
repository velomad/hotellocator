import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';

const Button = ({title, onPress, disable, color}) => {
  const styles = StyleSheet.create({
    buttonStyle: {
      width: SIZES.width / 1.1,
      height: 50,
      borderRadius: 10,
      backgroundColor:
        disable === true
          ? COLORS.lightGray
          : color === 'blue'
          ? COLORS.blue
          : COLORS.gray,
    },
  });

  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={onPress}
      disabled={disable}>
      <Text
        style={{
          color: COLORS.white,
          textAlign: 'center',
          lineHeight: 50,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
