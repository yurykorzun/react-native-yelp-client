import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ResultListItem from './ResultListItem';

const ResultsList = ({results, navigate}) => {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={localStyle.separator} />}
      data={results}
      renderItem={({item}) => (
        <ResultListItem item={item} navigate={navigate} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const localStyle = StyleSheet.create({
  separator: {height: 2},
});

export default ResultsList;
