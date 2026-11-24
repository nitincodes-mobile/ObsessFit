import React, { useState } from 'react';
import { Header } from '../../../components/common/Header';
import { Button } from '../../../components/common/Button';
import { useFitness } from '../../../context/FitnessContext';
import {
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './trainingDays.styled';
import { useTranslation } from 'react-i18next';
import { SelectionList } from '../../../components/SelectionList';
import {
  FourDaysIcon,
  SixDaysIcon,
  ThreeDaysIcon,
  TwoDaysIcon,
} from '../../../components/common/Icons';
import { BackHandler } from 'react-native';

interface TrainingDaysScreenProps {
  navigation: any;
}

export const TrainingDaysScreen: React.FC<TrainingDaysScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { profile, updateProfile } = useFitness();
  const [selectedDays, setSelectedDays] = useState<string>(
    profile.trainingDaysPerWeek,
  );

  const daysOptions = [
    {
      id: '2 days',
      title: 'trainingDaysScreen.daysOptions.two_days.title',
      Icon: TwoDaysIcon,
    },
    {
      id: '3 days',
      title: 'trainingDaysScreen.daysOptions.three_days.title',
      Icon: ThreeDaysIcon,
    },
    {
      id: '4 days',
      title: 'trainingDaysScreen.daysOptions.four_days.title',
      Icon: FourDaysIcon,
    },
    {
      id: '6+ days',
      title: 'trainingDaysScreen.daysOptions.six_plus_days.title',
      Icon: SixDaysIcon,
    },
  ];

  const handleComplete = () => {
    updateProfile({ trainingDaysPerWeek: selectedDays });
    BackHandler.exitApp();
  };

  return (
    <ScreenContainer>
      <Header
        onBack={navigation.goBack}
        title={t('trainingDaysScreen.title')}
      />

      <ContentContainer>
        <SelectionList
          data={daysOptions}
          selectedValue={selectedDays}
          onSelect={setSelectedDays}
        />
      </ContentContainer>

      <ButtonContainer>
        <Button title={t('common.complete')} onPress={handleComplete} />
      </ButtonContainer>
    </ScreenContainer>
  );
};
