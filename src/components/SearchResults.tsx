import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import ResultsList from './ResultsList';
import ResultsMap from './ResultsMap';

const Loading = () => {
  return (
    <View style={localStyle.loadingIndicator}>
      <ActivityIndicator animating={true} size="large" color="#0000ff" />
    </View>
  );
};

const Error = () => {
  return (
    <View>
      <Text>{'Oops, something went wrong...'}</Text>
    </View>
  );
};

const Results = ({isMapView, results, navigate, locationCoordinates}) => {
  return isMapView ? (
    <ResultsMap locationCoordinates={locationCoordinates} results={results} />
  ) : (
    <ResultsList results={results} navigate={navigate} />
  );
};

const SearchResults = ({
  isMapView,
  locationCoordinates,
  loadingResults,
  loadingFailed,
  results,
  navigate,
}) => {
  return (
    <View style={localStyle.container}>
      {loadingResults ? (
        <Loading />
      ) : loadingFailed ? (
        <Error />
      ) : (
        <Results
          isMapView={isMapView}
          locationCoordinates={locationCoordinates}
          results={results}
          navigate={navigate}
        />
      )}
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {flex: 1},
  loadingIndicator: {flex: 1, justifyContent: 'center'},
});

export default SearchResults;
