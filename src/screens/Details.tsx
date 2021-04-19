import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailsScreen = ({route, navigation}) => {
  const {params} = route;
  useEffect(() => {
    navigation.setOptions({title: params.name});
  }, [params.name, navigation]);

  const getImageUrl = () => {
    return params.photos && params.photos.length > 0
      ? params.photos[0]
      : 'https://dummyimage.com/250x250/000/fff&text=no+image';
  };
  return (
    <SafeAreaView style={localStyle.safeContainer}>
      <View style={localStyle.imageContainer}>
        <Image
          resizeMode="cover"
          style={localStyle.image}
          source={{
            uri: getImageUrl(),
          }}
        />
      </View>
      <View style={localStyle.imageOverlay} />
      <View style={localStyle.content}>
        <View style={localStyle.row}>
          <Stars
            half={true}
            default={params.rating}
            spacing={4}
            starSize={24}
            count={5}
            fullStar={<Icon name={'star'} size={24} color={'#e54a37'} />}
            emptyStar={<Icon name={'star-o'} size={24} color={'#e54a37'} />}
            halfStar={<Icon name={'star-half'} size={24} color={'#e54a37'} />}
          />
          <View style={localStyle.reviews}>
            <Text
              style={localStyle.text}>{`${params.review_count} Reviews`}</Text>
          </View>
        </View>
        <View style={localStyle.row}>
          {params.price ? (
            <Text style={localStyle.textPrice}>{params.price}</Text>
          ) : null}
          <Text
            style={localStyle.text}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {params.categories
              ?.map((category: {title: string}) => category.title)
              .join(', ')}
          </Text>
        </View>
        <View>
          <Text style={localStyle.textAddress}>
            {params.location?.formatted_address}
          </Text>
        </View>
      </View>
      <View style={localStyle.map}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={StyleSheet.absoluteFill}
          region={{
            latitude: params.coordinates.latitude,
            longitude: params.coordinates.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}>
          <Marker key={0} coordinate={params.coordinates} title={params.name} />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  safeContainer: {flex: 1},
  container: {flex: 1},
  imageContainer: {
    width: '100%',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#D2d5d8',
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
    marginBottom: 5,
  },
  imageOverlay: {height: 200},
  content: {height: 150, backgroundColor: '#FFFF', padding: 8},
  row: {flexDirection: 'row', paddingBottom: 8},
  textAddress: {color: '#696773', fontSize: 18},
  map: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D2d5d8',
  },
  reviews: {paddingLeft: 8},
  text: {fontSize: 18},
  textPrice: {fontSize: 18, paddingRight: 5, fontWeight: 'bold'},
});

export default DetailsScreen;
