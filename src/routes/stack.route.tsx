import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/main/home';
import Intro from '../screens/intro';
import AI from '../screens/ai';
import Carousel from '../screens/snap-carousel';
import RazorpayShop from '../screens/razor-pay-shop';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Intro">
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="AI" component={AI} />
      <Stack.Screen name="SC" component={Carousel} />
      <Stack.Screen name="VP" component={Home} />
      <Stack.Screen name="RPS" component={RazorpayShop} />
    </Stack.Navigator>
  );
}

export default MyStack;
