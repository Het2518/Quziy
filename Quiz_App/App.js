import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './navigation';

// Enhanced color palette with professional tones
const colors = {
  primary: '#2C5F9E',      // Deep professional blue
  secondary: '#1A73E8',    // Google-like blue
  background: '#F7FAFC',   // Soft light blue-gray
  text: '#2D3748',         // Dark slate gray
  accent: '#48BB78',       // Professional green
  white: '#FFFFFF',
  lightGray: '#E2E8F0'
};

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
      <StatusBar 
        style="dark" 
        backgroundColor={colors.background} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;