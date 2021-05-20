import React from 'react';
import { View } from 'react-native';
import ChatScreen from './app/screen/ChatScreen/ChatScreen';
import LisChatScreen from './app/screen/ChatScreen/ListChatScreen';
import LoginScreen from './app/screen/LoginScreen/LoginScreen';
import HomeScreen from './app/screen/HomeScreen/HomeScreen';
import LogupScreen from './app/screen/LogupScreen/LogupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Logup" component={LogupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ListChat" component={LisChatScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
