import React, { useState } from 'react';
import { Header } from '../../../components/common/Header';
import { Button } from '../../../components/common/Button';
import { useFitness } from '../../../context/FitnessContext';
import {
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './activitylevel.styled';
import { SelectionList } from '../../../components/SelectionList';
import { useTranslation } from 'react-i18next';
import {
  HighActiveIcon,
  LightActiveIcon,
  ModerateActiveIcon,
  SittingIcon,
} from '../../../components/common/Icons';

interface ActivityLevelScreenProps {
  navigation: any;
}

export const ActivityLevelScreen: React.FC<ActivityLevelScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { profile, updateProfile } = useFitness();
  const [selectedActivity, setSelectedActivity] = useState<string>(
    profile.activityLevel,
  );

  const levels = [
    {
      id: 'Sedentary',
      title: 'activityLevelScreen.levels.sedentary',
      Icon: SittingIcon,
    },
    {
      id: 'Lightly active',
      title: 'activityLevelScreen.levels.lightly_active',
      Icon: LightActiveIcon,
    },
    {
      id: 'Moderately active',
      title: 'activityLevelScreen.levels.moderately_active',
      Icon: ModerateActiveIcon,
    },
    {
      id: 'Highly active',
      title: 'activityLevelScreen.levels.highly_active',
      Icon: HighActiveIcon,
    },
  ];

  const handleNext = () => {
    updateProfile({ activityLevel: selectedActivity });
    navigation.navigate('FitnessExperienceScreen');
  };

  return (
    <ScreenContainer>
      <Header
        onBack={navigation.goBack}
        title={t('activityLevelScreen.title')}
        onSkip={handleNext}
      />

      <ContentContainer>
        <SelectionList
          data={levels}
          selectedValue={selectedActivity}
          onSelect={setSelectedActivity}
        />
      </ContentContainer>

      <ButtonContainer>
        <Button title={t('common.next')} onPress={handleNext} />
      </ButtonContainer>
    </ScreenContainer>
  );
};
