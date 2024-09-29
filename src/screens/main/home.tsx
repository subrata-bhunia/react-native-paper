import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Surface, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {wp, hp} from '../../utils/helper/dimensions';
type Props = {};
import {PermissionsAndroid} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getAllVideos} from '../../utils/helper/Videoutils';
import showToastAlert from '../../utils/helper/Toast';

const Home = (props: Props) => {
  const [videos, setVideos] = useState<string[]>([]);
  const [msg, setmsg] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchVideos() {
      const videoPaths = await getAllVideos();
      setVideos(videoPaths);
    }
    fetchVideos();
  }, []);
  console.log('videos', videos);
  const VideoCard = ({}) => {
    return (
      <Surface
        elevation={5}
        style={{
          alignSelf: 'center',
          borderRadius: wp(3),
          marginTop: wp(3),
          overflow: 'hidden',
        }}>
        <TouchableRipple onPress={() => console.log('Test')}>
          <View
            style={{
              height: hp(10),
              width: wp(90),
              flexDirection: 'row',
              //   justifyContent: 'space-between',
              gap: wp(2),
            }}>
            <Image
              source={{
                uri: 'https://www.shutterstock.com/image-photo/boat-tree-sunset-600nw-1770893537.jpg',
              }}
              style={{
                resizeMode: 'cover',
                height: '100%',
                width: '30%',
              }}
            />
            <Text
              variant="titleMedium"
              style={{
                marginTop: wp(1),
              }}>
              Killer
            </Text>
          </View>
        </TouchableRipple>
      </Surface>
    );
  };
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        padding: wp(2),
      }}>
      <Text variant="titleLarge">Local Files</Text>
      <VideoCard />
      {showToastAlert(msg)}
    </View>
  );
};

export default Home;
