import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserFitnessProfile {
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  weight: number;
  weightUnit: 'kg' | 'lbs';
  height: number;
  heightUnit: 'cm' | 'feet';
  primaryGoal: string;
  targetWeight: number;
  targetTimeline: string;
  activityLevel: string;
  fitnessExperience: string;
  trainingDaysPerWeek: string;
}

interface FitnessContextType {
  profile: UserFitnessProfile;
  updateProfile: (updates: Partial<UserFitnessProfile>) => void;
}

const defaultProfile: UserFitnessProfile = {
  gender: 'Male',
  age: 26,
  weight: 68.5,
  weightUnit: 'kg',
  height: 175,
  heightUnit: 'cm',
  primaryGoal: '',
  targetWeight: 74,
  targetTimeline: '',
  activityLevel: '',
  fitnessExperience: '',
  trainingDaysPerWeek: '',
};

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<UserFitnessProfile>(defaultProfile);

  const updateProfile = (updates: Partial<UserFitnessProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <FitnessContext.Provider value={{ profile, updateProfile }}>
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = (): FitnessContextType => {
  const context = useContext(FitnessContext);

  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }

  return context;
};
