import React from 'react';
import {ColorValue, StatusBar, StatusBarStyle} from 'react-native';

interface MyStatusBarProps {
  barStyle: StatusBarStyle;
  translucent?: boolean;
  backgroundColor?: ColorValue;
}

const MyStatusBar = ({
  backgroundColor,
  barStyle = 'dark-content',
  translucent,
  ...props
}: MyStatusBarProps) => {
  return (
    <StatusBar
      translucent={translucent}
      backgroundColor={backgroundColor}
      {...props}
      barStyle={barStyle}
    />
  );
};

export default MyStatusBar;
