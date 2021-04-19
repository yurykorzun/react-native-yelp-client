import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const ResultsMap = ({locationCoordinates, results}) => {
  return (
    <View style={localStyle.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={StyleSheet.absoluteFill}
        region={{
          latitude: locationCoordinates?.latitude,
          longitude: locationCoordinates?.longitude,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        }}>
        {results &&
          results.map((item, index) => (
            <Marker
              key={index}
              coordinate={item.coordinates}
              title={item.name}
            />
          ))}
      </MapView>
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {height: '100%', width: '100%', borderWidth: 1},
});

export default ResultsMap;
