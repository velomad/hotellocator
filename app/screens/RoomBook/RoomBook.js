import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RoomBook = () => {
  return (
    <View style={styles.container}>
      <Text>Room bookings</Text>
    </View>
  );
};

export default RoomBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
