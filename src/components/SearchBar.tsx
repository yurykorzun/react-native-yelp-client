import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({
  onUpdateSearch,
  onSubmitSearch,
  onUpdateLocation,
  onSubmitLocation,
  searchLocationName,
  searchTerm,
  showCurrentLocation,
  setShowCurrentLocation,
}) => {
  const locationInputRef: React.RefObject<TextInput> = React.createRef();

  useEffect(() => {
    if (!showCurrentLocation) {
      locationInputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCurrentLocation]);

  return (
    <View style={localStyle.container}>
      <View style={localStyle.searchContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#666"
          style={localStyle.inputSearch}
          placeholder="tacos, burritos, cheap dinner"
          value={searchTerm}
          onChangeText={onUpdateSearch}
          onSubmitEditing={onSubmitSearch}
        />
      </View>
      <View>
        {showCurrentLocation ? (
          <Pressable
            style={localStyle.inputSearch}
            onPress={() => setShowCurrentLocation(false)}>
            <View style={localStyle.currentLocationPressable}>
              <View style={localStyle.locationIcon}>
                <Icon name="map-marker" size={25} color="#00F" />
              </View>
              <View style={localStyle.locationLabel}>
                <Text style={localStyle.textLocation}>
                  {'Current location'}
                </Text>
              </View>
            </View>
          </Pressable>
        ) : (
          <TextInput
            ref={locationInputRef}
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
            style={localStyle.inputSearch}
            placeholder="address, neighborhood, state or zip"
            value={searchLocationName}
            onChangeText={onUpdateLocation}
            onEndEditing={onSubmitLocation}
          />
        )}
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {height: 105, padding: 5},
  searchContainer: {paddingBottom: 8},
  inputSearch: {
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 45,
    width: '100%',
    backgroundColor: '#FFFF',
    borderWidth: 1,
    borderColor: '#D2d5d8',
  },
  currentLocationPressable: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    padding: 5,
    alignContent: 'center',
  },
  locationIcon: {paddingRight: 8, justifyContent: 'center'},
  locationLabel: {justifyContent: 'center'},
  textLocation: {fontSize: 15},
});

export default SearchBar;
