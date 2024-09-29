
import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    //@ts-ignore
    navigationRef.navigate(name , params);
  }
}

export function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function reset(index: number, name: string) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: index,
      routes: [{name: name}],
    });
  }
}
