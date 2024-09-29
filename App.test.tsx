import React from 'react';
import {render} from '@testing-library/react-native';
import App from './App';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

describe('App Component', () => {
  it('renders correctly with light theme', async () => {
    const {getByText} = render(App());
    // You can replace this with actual content inside `MyStack`
    expect(NavigationContainer).toHaveBeenCalled();
    expect(PaperProvider).toHaveBeenCalled();
  });
});
