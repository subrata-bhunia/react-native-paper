import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {hp} from '../../utils/helper/dimensions';
import {Icon} from 'react-native-paper';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6);

const CarouselCardItem = ({item, index}: any) => {
  return (
    <ImageBackground
      source={{uri: item.imgUrl}}
      style={styles.container}
      key={index}>
      <View style={styles.image} />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <TouchableOpacity
        style={{position: 'absolute', top: 20, right: 20}}
        onPress={() => {
          if (item?.onPress) {
            item?.onPress();
          }
        }}>
        {item?.love ? (
          <Icon source={'heart'} size={30} color="#f00" />
        ) : (
          <Icon source={'heart-outline'} size={30} color="#f00" />
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderRadius: 20,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    overflow: 'hidden',
  },
  image: {
    width: ITEM_WIDTH,
    height: hp(40),
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#fff',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
