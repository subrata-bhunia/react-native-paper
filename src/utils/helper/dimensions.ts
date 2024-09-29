import {Dimensions} from 'react-native';

const hp = (s: number) => {
  return Dimensions.get('screen').height * (s / 100);
};
const wp = (s: number) => {
  return Dimensions.get('screen').width * (s / 100);
};

export {hp, wp};
