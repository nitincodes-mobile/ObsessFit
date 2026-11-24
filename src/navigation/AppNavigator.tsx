import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AgeScreen } from '../screens/onboarding/ageScreen';

import { GenderScreen } from '../screens/onboarding/genderScreen';
import { WeightScreen } from '../screens/onboarding/weightScreen';
import { HeightScreen } from '../screens/onboarding/heightScreen';
import { PrimaryGoalScreen } from '../screens/onboarding/primaryGoalScreen';
import { TargetWeightScreen } from '../screens/onboarding/targetWeightScreen';
import { TargetDateScreen } from '../screens/onboarding/targetDateScreen/TargetDateScreen';
import { ActivityLevelScreen } from '../screens/onboarding/activitylevelScreen';
import { FitnessExperienceScreen } from '../screens/onboarding/fitnessExperience';
import { TrainingDaysScreen } from '../screens/onboarding/trainingDaysScreen/TrainingDaysScreen';
import { WelcomeScreen } from '../screens/onboarding/welcomeSceen';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'WelcomeScreen'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="GenderScreen" component={GenderScreen} />
        <Stack.Screen name="AgeScreen" component={AgeScreen} />
        <Stack.Screen name="WeightScreen" component={WeightScreen} />
        <Stack.Screen name="HeightScreen" component={HeightScreen} />
        <Stack.Screen name="PrimaryGoalScreen" component={PrimaryGoalScreen} />
        <Stack.Screen
          name="TargetWeightScreen"
          component={TargetWeightScreen}
        />
        <Stack.Screen name="TargetDateScreen" component={TargetDateScreen} />
        <Stack.Screen
          name="ActivityLevelScreen"
          component={ActivityLevelScreen}
        />
        <Stack.Screen
          name="FitnessExperienceScreen"
          component={FitnessExperienceScreen}
        />

        <Stack.Screen
          name="TrainingDaysScreen"
          component={TrainingDaysScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
