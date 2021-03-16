import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../..//store/action';
import {View, Text, StyleSheet} from 'react-native';

const Account = (props) => {

  const handleLogout = () => {
    props.signOut()
  }

  return (
    <View style={styles.container}>
      <Text>test screen</Text>
      <Text onPress={handleLogout}>Logout</Text>
    </View>
  );
};

export default connect(null, {signOut})(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
