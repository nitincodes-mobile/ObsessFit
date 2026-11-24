import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '../../../components/common/Header';

import { useFitness } from '../../../context/FitnessContext';

import {
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './ageScreen.styled';
import { AgePicker } from '../../../components/agePicker';
import { Button } from '../../../components/common/Button';

interface AgeScreenProps {
  navigation: any;
}

export const AgeScreen: React.FC<AgeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { updateProfile } = useFitness();

  const [date, setDate] = useState({
    month: 3,
    day: 4,
    year: 1995,
  });

  const handleNext = () => {
    const today = new Date();

    let age = today.getFullYear() - date.year;

    if (
      today.getMonth() < date.month ||
      (today.getMonth() === date.month && today.getDate() < date.day)
    ) {
      age--;
    }

    updateProfile({ age });
    navigation.navigate('WeightScreen');
  };

  return (
    <ScreenContainer>
      <Header
        onBack={() => navigation.goBack()}
        title={t('ageScreen.title')}
        onSkip={handleNext}
      />

      <ContentContainer>
        <AgePicker
          month={date.month}
          day={date.day}
          year={date.year}
          onDateChange={setDate}
        />
        <ButtonContainer>
          <Button title={t('common.next')} onPress={handleNext} />
        </ButtonContainer>
      </ContentContainer>
    </ScreenContainer>
  );
};
