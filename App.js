import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    isOnboardingComplete: false,
  });

  useEffect(() => {
    const loadDataFromAsyncStorage = async () => {
      try {
        const savedState = await AsyncStorage.getItem('@appState');
        if (savedState !== null) {
          setState(JSON.parse(savedState));
        } else {
          setState({ isLoading: false, isOnboardingComplete: false });
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage', error);
      }
    };
    loadDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const saveDataToAsyncStorage = async () => {
      try {
        const stateString = JSON.stringify(state);
        await AsyncStorage.setItem('@appState', stateString);
      } catch (error) {
        console.error('Error saving data to AsyncStorage', error);
      }
    };
    saveDataToAsyncStorage();
  }, [state]);

  const handleOnboardingComplete = () => {
    // Perform any necessary tasks when onboarding is completed
    // For example, you might want to save some data or settings
    // in AsyncStorage to indicate that onboarding is complete.

    // Update the state to indicate that onboarding is complete
    setState({ ...state, isOnboardingComplete: true });

  };

  if (state.isLoading) {
    // Show a loading screen while checking the onboarding status
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        {console.log(state)}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!state.isOnboardingComplete ? (
          // Onboarding completed, user is signed in
          <Stack.Screen name="Profile" component={Profile} />
        ) : (
          // User is NOT signed in
          <Stack.Screen name="Onboarding" component={Onboarding} onComplete={handleOnboardingComplete} />
        )}
      </Stack.Navigator>




    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
