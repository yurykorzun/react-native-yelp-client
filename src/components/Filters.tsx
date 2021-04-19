import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Pressable, View} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';

const Filters = ({
  setIsMapView,
  isMapView,
  getCategories,
  onCategoriesChange,
  selectedCategories,
}) => {
  const [showCategories, setSowCategories] = useState(false);

  return (
    <View style={localStyle.container}>
      <View style={localStyle.filters}>
        <Pressable
          style={localStyle.filterContainer}
          onPress={() => setIsMapView(!isMapView)}>
          {isMapView ? (
            <View style={localStyle.filter}>
              <View style={localStyle.filterIcon}>
                <Icon name={'list'} size={15} />
              </View>
              <Text>{'List View'}</Text>
            </View>
          ) : (
            <View style={localStyle.filter}>
              <View style={localStyle.filterIcon}>
                <Icon name={'map'} size={15} />
              </View>
              <Text>{'Map View'}</Text>
            </View>
          )}
        </Pressable>
        <Pressable
          style={localStyle.filterContainer}
          onPress={() => setSowCategories(!showCategories)}>
          <Text>{showCategories ? 'Hide filter' : 'Categories filter'}</Text>
        </Pressable>
      </View>
      {showCategories ? (
        <View style={localStyle.select}>
          <SectionedMultiSelect
            items={getCategories()}
            icons={{
              search: {
                name: 'search', // search input
                size: 24,
              },
              arrowUp: {
                name: 'keyboard-arrow-up', // dropdown toggle
                size: 22,
              },
              arrowDown: {
                name: 'keyboard-arrow-down', // dropdown toggle
                size: 22,
              },
              close: {
                name: 'close', // chip close
                size: 16,
              },
              check: {
                name: 'check', // selected item
                size: 16,
              },
              cancel: {
                name: 'cancel', // cancel button
                size: 18,
              },
            }}
            IconRenderer={Icon}
            uniqueKey="id"
            subKey="children"
            selectText="Tap to select categories"
            showDropDowns={true}
            showChips={true}
            onSelectedItemsChange={onCategoriesChange}
            selectedItems={selectedCategories}
          />
        </View>
      ) : null}
    </View>
  );
};

const localStyle = StyleSheet.create({
  container: {paddingTop: 5, paddingBottom: 5},
  filters: {
    height: 35,
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  filterContainer: {
    paddingRight: 5,
    borderWidth: 2,
    borderColor: '#D2d5d8',
    borderRadius: 5,
    justifyContent: 'center',
  },
  filter: {
    flexDirection: 'row',
    width: 85,
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  filterIcon: {justifyContent: 'center', alignContent: 'center'},
  select: {
    backgroundColor: '#D2d5d8',
    borderWidth: 1,
    borderColor: '#D2d5d8',
  },
});

export default Filters;
