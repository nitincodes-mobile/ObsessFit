import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '../../../components/common/Header';
import {
  BodyWeight,
  CyclingIcon,
  EventIcon,
  RunningIcon,
  SixPack,
  SportsIcon,
  Strength,
  TrainingIcon,
  YogaIcon,
} from '../../../components/common/Icons';
import { useFitness } from '../../../context/FitnessContext';
import { SelectionList } from '../../../components/SelectionList';

import {
  ScreenContainer,
  ContentContainer,
  ButtonContainer,
} from './primaryGoalScreen.styled';
import { Button } from '../../../components/common/Button';

interface PrimaryGoalScreenProps {
  navigation: any;
}

interface GoalOption {
  id: string;
  title: string;
  Icon: React.ComponentType<{
    size?: number;
    color?: string;
  }>;
}

const GOALS: GoalOption[] = [
  {
    id: 'fat_loss',
    title: 'primaryGoalScreen.goals.fat_loss',
    Icon: BodyWeight,
  },
  {
    id: 'muscle_gain',
    title: 'primaryGoalScreen.goals.muscle_gain',
    Icon: SixPack,
  },
  {
    id: 'strength_training',
    title: 'primaryGoalScreen.goals.strength_training',
    Icon: Strength,
  },
  {
    id: 'running',
    title: 'primaryGoalScreen.goals.running',
    Icon: RunningIcon,
  },
  {
    id: 'cycling',
    title: 'primaryGoalScreen.goals.cycling',
    Icon: CyclingIcon,
  },
  {
    id: 'sports_performance',
    title: 'primaryGoalScreen.goals.sports_performance',
    Icon: SportsIcon,
  },
  {
    id: 'yoga_flexibility',
    title: 'primaryGoalScreen.goals.yoga_flexibility',
    Icon: YogaIcon,
  },
  {
    id: 'endurance_hybrid_training',
    title: 'primaryGoalScreen.goals.endurance_hybrid_training',
    Icon: TrainingIcon,
  },
  {
    id: 'event_preparation',
    title: 'primaryGoalScreen.goals.event_preparation',
    Icon: EventIcon,
  },
];

export const PrimaryGoalScreen: React.FC<PrimaryGoalScreenProps> = ({
  navigation,
}) => {
  const { profile, updateProfile } = useFitness();
  const { t } = useTranslation();

  const [selectedGoal, setSelectedGoal] = useState(profile.primaryGoal);

  const handleNext = useCallback(() => {
    updateProfile({ primaryGoal: selectedGoal });
    navigation.navigate('TargetWeightScreen');
  }, [selectedGoal, updateProfile, navigation]);

  return (
    <ScreenContainer>
      <Header
        onBack={navigation.goBack}
        title={t('primaryGoalScreen.title')}
        onSkip={handleNext}
      />

      <ContentContainer>
        <SelectionList
          data={GOALS}
          selectedValue={selectedGoal}
          onSelect={setSelectedGoal}
        />
      </ContentContainer>

      <ButtonContainer>
        <Button title={t('common.next')} onPress={handleNext} />
      </ButtonContainer>
    </ScreenContainer>
  );
};
