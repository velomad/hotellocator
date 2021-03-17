import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import MapView, {
  Polygon,
  Marker,
  Callout,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import {COLORS, FONTS, SIZES} from '../../constants';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

// Actions
// import {} from '../../store/action';

const Home = (props) => {
  const map = useRef();
  const carousel = useRef(null);

  const [coords, setCoords] = useState({});
  const [markers, setMarkers] = useState([]);
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'test',
      latitude: 19.4243769,
      longitude: 72.811126,
      image: require('../../assets/h1.jpg'),
      rooms: [
        {type: 'delux', cost: 2600},
        {type: 'AC', cost: 2200},
      ],
    },
    {
      id: 2,
      name: 'best',
      latitude: 19.4252145,
      longitude: 72.812675,
      image: require('../../assets/h2.jpg'),
      rooms: [
        {type: 'delux', cost: 2600},
        {type: 'AC', cost: 2200},
      ],
    },
    {
      id: 3,
      name: 'rest',
      latitude: 19.4246982,
      longitude: 72.813954,
      image: require('../../assets/h3.jpg'),
      rooms: [
        {type: 'delux', cost: 2600},
        {type: 'AC', cost: 2200},
      ],
    },
    {
      id: 4,
      name: 'chest',
      latitude: 19.4252657,
      longitude: 72.813657,
      image: require('../../assets/h4.jpg'),
      rooms: [
        {type: 'delux', cost: 2600},
        {type: 'AC', cost: 2200},
      ],
    },
  ]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        getPermissions();
      } else {
        getPermissions();
      }
    }
  };

  // native location enabler
  const getPermissions = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).then(data => {
      if (data === 'already-enabled') {
        locateCurrentPosition();
      } else {
        locateCurrentPosition();
      }
    });
  };

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(position);
      const {latitude, longitude} = position.coords;
      setCoords({latitude, longitude});
    });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const region = {
    latitude: 19.4246982,
    longitude: 72.812675,
    latitudeDelta: 0.005,
    longitudeDelta: 0.009,
  };

  const onCarouselItemChange = index => {
    const location = hotels[index];

    map.current.animateToRegion({
      // latitude: 19.4246982,
      // longitude: 72.812675,
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.009,
    });
    markers[index].showCallout();
  };

  const onMarkerPress = (location, index) => {
    carousel.current.snapToItem(index);
  };

  const renderCarouselItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.cardContainer}
      onPress={() => props.navigation.navigate('RoomBook', {itemId: item.id})}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.hotelName}>{item.name}</Text>
      {item.rooms.map((el, index) => (
        <View style={styles.roomInfo} key={index}>
          <View style={{flexDirection: 'column'}}>
            <Text
              key={index}
              style={{
                color: COLORS.gray,
              }}>
              {el.type}
            </Text>
          </View>
          <View style={{flexDirection: 'column', paddingVertical: 2}}>
            <Text
              style={{
                color: COLORS.gray,
              }}>
              &#x20B9; {el.cost}
            </Text>
          </View>
        </View>
      ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ccc" barStyle="dark-content" />
      {coords.latitude === undefined && coords.longitude === undefined ? (
        <Text>Loading..</Text>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          ref={map}
          initialRegion={{
            // latitude: coords.latitude,
            // longitude: coords.longitude,
            latitude: 19.4246982,
            longitude: 72.812675,
            latitudeDelta: 0.09,
            longitudeDelta: 0.14,
          }}>
          {hotels.map((hotel, index) => (
            <Marker
              onPress={() => onMarkerPress(hotel, index)}
              key={index}
              ref={ref => (markers[index] = ref)}
              coordinate={{
                latitude: hotel.latitude,
                longitude: hotel.longitude,
              }}
              // title={hotel.name}
            >
              <Callout>
                <Text>{hotel.name}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <Carousel
        onMagicTap={() => console.log('pressed')}
        ref={carousel}
        data={hotels}
        loop={false}
        removeClippedSubviews={false}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        onSnapToItem={index => onCarouselItemChange(index)}
      />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  cardContainer: {
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 220,
    width: 300,
  },
  cardImage: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: 120,
    width: 300,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray,
    textTransform: 'capitalize',
    padding: 8,
  },
  roomInfo: {
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
