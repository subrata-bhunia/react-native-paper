import React from 'react';
import {StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import AiHome from '../screens/ai-home';
import AiImage from '../screens/ai-image';
import AiSpeech from '../screens/ai-speech';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const AI: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: BottomTabBarProps) => (
        <BottomNavigation.Bar
          navigationState={props.state}
          safeAreaInsets={props.insets}
          onTabPress={({route, preventDefault}) => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            } as BottomTabNavigationEventMap['tabPress']);

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              props.navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: props.state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = props.descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = props.descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Chat"
        component={AiHome}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => {
            return <Icon name="chat" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Image"
        component={AiImage}
        options={{
          tabBarLabel: 'Image',
          tabBarIcon: ({color, size}) => {
            return <Icon name="image" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Speech"
        component={AiSpeech}
        options={{
          tabBarLabel: 'Speech',
          tabBarIcon: ({color, size}) => {
            return <Icon name="text" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AI;
