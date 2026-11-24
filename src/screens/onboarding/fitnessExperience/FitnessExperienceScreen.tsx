import React, { useState } from 'react';

import {
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './fitnessExperience.styled';
import { SelectionList } from '../../../components/SelectionList';
import { useTranslation } from 'react-i18next';
import { Header } from '../../../components/common/Header';
import { useFitness } from '../../../context/FitnessContext';
import { Button } from '../../../components/common/Button';
import {
  AdvancedIcon,
  AthleteIcon,
  BeginnerIcon,
  IntermediateIcon,
} from '../../../components/common/Icons';

interface FitnessExperienceScreenProps {
  navigation: any;
}

export const FitnessExperienceScreen: React.FC<
  FitnessExperienceScreenProps
> = ({ navigation }) => {
  const { t } = useTranslation();
  const { profile, updateProfile } = useFitness();
  const [selectedExperience, setSelectedExperience] = useState<string>(
    profile.fitnessExperience,
  );

  const levels = [
    {
      id: 'Beginner',
      title: 'fitnessExperienceScreen.levels.beginner',
      Icon: BeginnerIcon,
    },
    {
      id: 'Intermediate',
      title: 'fitnessExperienceScreen.levels.intermediate',
      Icon: IntermediateIcon,
    },
    {
      id: 'Advanced',
      title: 'fitnessExperienceScreen.levels.advanced',
      Icon: AdvancedIcon,
    },
    {
      id: 'Athlete',
      title: 'fitnessExperienceScreen.levels.athlete',
      Icon: AthleteIcon,
    },
  ];
  const handleNext = () => {
    updateProfile({ fitnessExperience: selectedExperience });
    navigation.navigate('TrainingDaysScreen');
  };

  return (
    <ScreenContainer>
      <Header
        onBack={navigation.goBack}
        title={t('fitnessExperienceScreen.title')}
        onSkip={handleNext}
      />

      <ContentContainer>
        <SelectionList
          data={levels}
          selectedValue={selectedExperience}
          onSelect={setSelectedExperience}
        />
      </ContentContainer>

      <ButtonContainer>
        <Button title={t('common.next')} onPress={handleNext} />
      </ButtonContainer>
    </ScreenContainer>
  );
};
