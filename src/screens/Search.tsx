import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  useYelpSearchCoordinates,
  useYelpSearchLocation,
} from '../services/yelp';
import getCategories from '../data/Categories';
import Geocoder from 'react-native-geocoding';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import SearchResults from '../components/SearchResults';
import {SafeAreaView} from 'react-native-safe-area-context';

type LocationProps = {
  longitude: number;
  latitude: number;
};

const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocationName, setSearchLocationName] = useState('');
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [
    searchLocationCoordinates,
    setSearchLocationCoordinates,
  ] = useState<LocationProps>();
  const [yelpResults, setYelpResults] = useState([]);
  const [
    currentLocationCoordinates,
    setCurrentLocationCoordinates,
  ] = useState<LocationProps>();
  const [
    yelpSearchLocation,
    {
      data: dataYelpLocation,
      loading: loadingYelpLocation,
      error: errorYelpLocation,
    },
  ] = useYelpSearchLocation();
  const [
    yelpSearchCoordinates,
    {
      data: dataYelpCoordinates,
      loading: loadingYelpCoordinates,
      error: errorYelpCoordinates,
    },
  ] = useYelpSearchCoordinates();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesQuery, setCategoriesQuery] = useState('');
  const [isMapView, setIsMapView] = useState(false);

  const onUpdateSearch = (text: string) => {
    setSearchTerm(text);
  };

  const onSubmitSearch = () => {
    if (searchLocationName) {
      yelpSearchLocation({
        variables: {
          term: searchTerm,
          location: searchLocationName,
          categories: categoriesQuery,
          offset: 0,
          limit: 10,
        },
      });
    } else if (currentLocationCoordinates) {
      yelpSearchCoordinates({
        variables: {
          term: searchTerm,
          categories: categoriesQuery,
          longitude: currentLocationCoordinates?.longitude,
          latitude: currentLocationCoordinates?.latitude,
          offset: 0,
          limit: 10,
        },
      });
    }
  };

  const onUpdateLocation = (text: string) => {
    setSearchLocationName(text);
  };

  useEffect(() => {
    Geocoder.init(Config.GOOGLE_API_KEY);

    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info?.coords;

      setCurrentLocationCoordinates({longitude, latitude});
      setShowCurrentLocation(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onSubmitSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocationCoordinates, searchLocationCoordinates, categoriesQuery]);

  useEffect(() => {
    const {business} = dataYelpLocation?.search ?? [];
    setYelpResults(business);
  }, [dataYelpLocation, loadingYelpLocation]);

  useEffect(() => {
    const {business} = dataYelpCoordinates?.search ?? [];
    setYelpResults(business);
  }, [dataYelpCoordinates, loadingYelpCoordinates]);

  const onSubmitLocation = async () => {
    if (!searchLocationName) {
      setShowCurrentLocation(true);
      setSearchLocationCoordinates(undefined);
    } else {
      try {
        const geolocationResult = await Geocoder.from(searchLocationName);
        if (
          geolocationResult.status === 'OK' &&
          geolocationResult.results.length > 0
        ) {
          const {location} = geolocationResult.results[0]?.geometry;
          if (location) {
            setSearchLocationCoordinates({
              longitude: location.lng,
              latitude: location.lat,
            });
          }
        }
      } catch (geolocationError) {}
    }
  };

  const onSelectedItemsChange = selectedItems => {
    setSelectedCategories(selectedItems);

    if (selectedItems && selectedItems.length > 0) {
      setCategoriesQuery(selectedItems.join(','));
    } else {
      setCategoriesQuery('');
    }
  };

  return (
    <SafeAreaView style={localStyle.safeContainer}>
      <View style={localStyle.container}>
        <SearchBar
          onUpdateSearch={onUpdateSearch}
          onSubmitSearch={onSubmitSearch}
          onUpdateLocation={onUpdateLocation}
          onSubmitLocation={onSubmitLocation}
          searchLocationName={searchLocationName}
          searchTerm={searchTerm}
          showCurrentLocation={showCurrentLocation}
          setShowCurrentLocation={setShowCurrentLocation}
        />
        <Filters
          setIsMapView={setIsMapView}
          isMapView={isMapView}
          getCategories={getCategories}
          onCategoriesChange={onSelectedItemsChange}
          selectedCategories={selectedCategories}
        />
        <SearchResults
          isMapView={isMapView}
          locationCoordinates={
            searchLocationCoordinates ?? currentLocationCoordinates
          }
          loadingResults={loadingYelpCoordinates || loadingYelpLocation}
          loadingFailed={errorYelpCoordinates || errorYelpLocation}
          results={yelpResults}
          navigate={navigation.navigate}
        />
      </View>
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  safeContainer: {flex: 1},
  container: {flex: 1, backgroundColor: '#FFFF'},
});

export default SearchScreen;
