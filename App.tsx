import * as React from 'react';
import {PermissionsAndroid, Platform, useColorScheme} from 'react-native';
import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import MyStack from './src/routes/stack.route';
import {navigationRef} from './src/utils/helper/RootNavigation';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

export default function App() {
  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme === 'dark' ? {...CombinedDarkTheme} : {...CombinedLightTheme};
  const [visible, setVisible] = React.useState(false);

  async function requestMultiplePermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        const readGranted =
          granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED;
        const writeGranted =
          granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED;
        return readGranted && writeGranted;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return false;
  }
  React.useEffect(() => {
    requestMultiplePermissions();
  }, []);
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={paperTheme} ref={navigationRef}>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
