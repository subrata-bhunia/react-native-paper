import {View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

type Props = {};

const AiSpeech = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text variant="headlineMedium">Comming Soon ...</Text>
    </View>
  );
};

export default AiSpeech;
