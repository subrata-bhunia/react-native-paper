import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

async function requestMultiplePermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const readGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const writeGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      const manageGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      );

      if (readGranted && writeGranted && manageGranted) {
        return true;
      }

      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);

      const readPermission =
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const writePermission =
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (readPermission && writePermission) {
        if (Platform.Version >= 30) {
          const managePermission = await request(
            PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
          );
          if (managePermission === RESULTS.GRANTED) {
            return true;
          } else {
            ToastAndroid.show(
              'Please enable "All files access" in settings',
              ToastAndroid.LONG,
            );
            openSettings();
            return false;
          }
        }
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return false;
}

async function getAllVideos(): Promise<string[]> {
  const isGranted = await requestMultiplePermissions();
  //   if (!isGranted) {
  //     console.log('Storage permissions not granted');
  //     return [];
  //   }

  const videoExtensions = ['mp4', 'mkv', 'avi', 'mov'];
  const videoFiles: string[] = [];

  async function readDirectory(path: string) {
    const items = await RNFS.readDir(path);
    for (const item of items) {
      if (
        item.isFile() &&
        videoExtensions.includes(
          item.name.split('.').pop()?.toLowerCase() || '',
        )
      ) {
        videoFiles.push(item.path);
      } else if (item.isDirectory()) {
        await readDirectory(item.path);
      }
    }
  }

  const externalStorageDirectory = RNFS.ExternalStorageDirectoryPath;
  await readDirectory(externalStorageDirectory);

  return videoFiles;
}

export {getAllVideos};
