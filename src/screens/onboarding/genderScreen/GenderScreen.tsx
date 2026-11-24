import React, { useState } from 'react';
import { Header } from '../../../components/common/Header';
import { useFitness } from '../../../context/FitnessContext';
import { useTranslation } from 'react-i18next';
import { GenderSelection } from './GenderSelection';
import {
  BottomText,
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './gender.styled';
import { Button } from '../../../components/common/Button';

interface GenderScreenProps {
  navigation: any;
}

export const GenderScreen: React.FC<GenderScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const { profile, updateProfile } = useFitness();
  const [selectedGender, setSelectedGender] = useState<
    'Male' | 'Female' | 'Other'
  >(profile.gender || 'Male');

  const handleNext = () => {
    updateProfile({ gender: selectedGender });
    navigation.navigate('AgeScreen');
  };

  return (
    <ScreenContainer>
      <Header
        onBack={() => navigation.goBack()}
        title={t('genderScreen.title')}
        onSkip={handleNext}
      />
      <ContentContainer>
        <GenderSelection
          selectedGender={selectedGender}
          onSelect={setSelectedGender}
        />
      </ContentContainer>
      <ButtonContainer>
        <BottomText>{t('genderScreen.subTitle')}</BottomText>
        <Button title={t('common.next')} onPress={handleNext} />
      </ButtonContainer>
    </ScreenContainer>
  );
};
