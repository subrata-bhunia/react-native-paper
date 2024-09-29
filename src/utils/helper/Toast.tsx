// import {ToastAndroid, Platform} from 'react-native';
// import Toast from 'react-native-simple-toast';
// import {Alert} from 'react-native-windows';

import {Alert} from 'react-native';
import {Snackbar, SnackbarProps} from 'react-native-paper';

// export default function showToastAlert(message: string | undefined) {
//   if (!message || message.trim() === '') {
//     return;
//   }
//   if (Platform.OS === 'android') {
//     ToastAndroid.show(message, ToastAndroid.SHORT);
//   } else if (Platform.OS === 'ios') {
//     Toast.show(message, Toast.SHORT);
//   } else {
//     Alert.alert('', message, [], {cancelable: true});
//   }
// }
export default function showToastAlert(message: string | undefined) {
  return (
    <Snackbar
      visible={message !== undefined}
      onDismiss={() => {}}
      // action={{
      //   label: 'Undo',
      //   onPress: () => {
      //     // Do something
      //   },
      // }}
      duration={1000}>
      {message}
    </Snackbar>
  );
}
