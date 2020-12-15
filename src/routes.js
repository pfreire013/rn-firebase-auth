import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home';
import Login from './Login';
import ConfirmOTP from './ConfirmOTP';
import { SafeAreaView } from 'react-native';
import PhoneLogin from './PhoneLogin';
import Register from './Register';

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='ConfirmOTP' component={ConfirmOTP} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='PhoneLogin' component={PhoneLogin} />
          <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
