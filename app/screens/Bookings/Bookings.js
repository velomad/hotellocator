import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Card} from '../../components';
import {SIZES, images, FONTS, COLORS} from '../../constants';

const Bookings = () => {
  return (
    <View style={styles.container}>
      <View style={{padding: 10, marginTop: '5%'}}>
        <Card>
          <View style={{flexDirection: 'row', position: 'relative'}}>
            <View style={styles.shadow}>
              <Image
                source={images.skiVilla}
                resizeMode="cover"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 15,
                }}
              />
            </View>

            <View
              style={{
                marginHorizontal: SIZES.radius,
                justifyContent: 'space-around',
              }}>
              <Text style={{...FONTS.h3}}>Ski Villa</Text>
              <Text style={{color: COLORS.gray, ...FONTS.body3}}>France</Text>
            </View>

            <View
              style={{
                position: 'absolute',
                right: 10,
                bottom: 0,
              }}>
              <Text>{Date.now()}</Text>
              <Text style={{marginTop: SIZES.padding}}>&#x20B9; 1350</Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
