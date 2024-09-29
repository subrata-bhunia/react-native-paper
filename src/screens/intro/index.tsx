import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {hp, wp} from '../../utils/helper/dimensions';
import {Button, Text} from 'react-native-paper';
import {navigate, replace} from '../../utils/helper/RootNavigation';

type Props = {};

const Intro = (props: Props) => {
  return (
    <View
      style={{
        padding: wp(2),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: hp(3),
      }}>
      <Text
        variant="displaySmall"
        style={{
          marginBottom: hp(10),
        }}>
        Choose Your Destiny
      </Text>
      {/* <LottieView
        source={require('../../assets/animations/1.json')}
        style={{width: wp(100), height: hp(100)}}
        loop
        autoPlay
      /> */}
      <Button
        icon="brain"
        mode="contained-tonal"
        onPress={() => replace('AI')}
        compact={false}
        style={
          {
            // height: hp(8),
            // width: wp(70),
            // alignItems: 'center',
            // justifyContent: 'center',
          }
        }
        elevation={4}>
        MyAI
      </Button>
      <Button
        icon="video-vintage"
        mode="contained-tonal"
        onPress={() => console.log('Pressed')}
        compact={false}
        style={
          {
            // height: hp(8),
            // width: wp(70),
            // alignItems: 'center',
            // justifyContent: 'center',
          }
        }
        elevation={4}>
        Video Player
      </Button>
      <Button
        icon="slide"
        mode="contained-tonal"
        onPress={() => navigate('SC')}
        compact={false}
        elevation={4}>
        Snap Carousel
      </Button>
      <Button
        icon="shopping-outline"
        mode="contained-tonal"
        onPress={() => navigate('RPS')}
        compact={false}
        elevation={4}>
        Razor Pay Shop
      </Button>
    </View>
  );
};

export default Intro;
