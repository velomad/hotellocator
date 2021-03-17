import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, SIZES, COLORS} from '../../constants';

const Card = ({children}) => {
  return (
    <View style={styles.cardStyle}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardStyle: {
    padding:SIZES.radius,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
