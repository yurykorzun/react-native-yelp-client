import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/FontAwesome';

const ResultListItem = ({item, navigate}) => {
  const getImageUrl = () => {
    return item.photos && item.photos.length > 0
      ? item.photos[0]
      : 'https://dummyimage.com/250x250/000/fff&text=no+image';
  };

  return (
    <Pressable
      style={localStyle.container}
      onPress={() => navigate('Details', item)}>
      <View style={localStyle.imageContainer}>
        <Image
          style={localStyle.image}
          source={{
            uri: getImageUrl(),
          }}
        />
      </View>
      <View>
        <View style={localStyle.labelName}>
          <Text style={localStyle.textName}>{item.name}</Text>
        </View>
        <View style={localStyle.row}>
          <View style={localStyle.stars}>
            <Stars
              half={true}
              default={item.rating}
              spacing={4}
              starSize={24}
              count={5}
              fullStar={<Icon name={'star'} size={15} color={'#e54a37'} />}
              emptyStar={<Icon name={'star-o'} size={15} color={'#e54a37'} />}
              halfStar={<Icon name={'star-half'} size={15} color={'#e54a37'} />}
            />
          </View>
          <View style={localStyle.rating}>
            <Text style={localStyle.text}>{item.rating}</Text>
          </View>
          <View>
            <Text
              style={localStyle.text}>{`${item.review_count} Reviews`}</Text>
          </View>
        </View>
        <View style={localStyle.info}>
          {item.price ? (
            <Text style={localStyle.textPrice}>{item.price}</Text>
          ) : null}
          <Text
            style={localStyle.text}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {item.categories
              ?.map((category: {title: string}) => category.title)
              .join(', ')}
          </Text>
        </View>
        <View>
          <Text style={localStyle.textAddress}>
            {item.location?.formatted_address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const localStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D2d5d8',
  },
  imageContainer: {padding: 5},
  image: {
    aspectRatio: 1,
    height: 110,
    borderRadius: 4,
    marginBottom: 5,
  },
  labelName: {paddingBottom: 5},
  textName: {fontSize: 16, fontWeight: 'bold'},
  row: {flexDirection: 'row'},
  stars: {justifyContent: 'center', paddingRight: 2},
  rating: {justifyContent: 'center', paddingRight: 8},
  text: {fontSize: 13},
  textAddress: {color: '#696773', fontSize: 13},
  textPrice: {fontSize: 13, paddingRight: 5, fontWeight: 'bold'},
  info: {flexDirection: 'row', width: '80%'},
});

export default ResultListItem;
