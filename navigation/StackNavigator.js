import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import PostScreen from "../screens/PostScreen";
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
            headerShown: false
        }}>

        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="PostScreen" component={PostScreen} />

        </Stack.Navigator>
    )
}

export default StackNavigator;