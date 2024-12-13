import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/home';
import Quiz from '../screens/quiz';
import Result from '../screens/result';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2C5F9E',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ title: 'QuizY - Home' }}
            />
            <Stack.Screen 
                name="Quiz" 
                component={Quiz} 
                options={{ title: 'Take Your Quiz' }}
            />
            <Stack.Screen 
                name="Result" 
                component={Result} 
                options={{ title: 'Quiz Results' }}
            />
        </Stack.Navigator>
    );
}

export default MyStack;