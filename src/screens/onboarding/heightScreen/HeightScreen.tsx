import React, { useCallback, useState } from 'react';
import { useFitness } from '../../../context/FitnessContext';
import {
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './heightScreen.styled';
import { Header } from '../../../components/common/Header';
import { useTranslation } from 'react-i18next';
import { UnitToggle } from '../../../components/unitToggle';
import { HeightRuler } from '../../../components/heightRuler';
import { Button } from '../../../components/common/Button';

interface HeightScreenProps {
  navigation: any;
}

type HeightUnit = 'cm' | 'feet';

export const HeightScreen: React.FC<HeightScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { profile, updateProfile } = useFitness();

  const [unit, setUnit] = useState<HeightUnit>(
    (profile.heightUnit as HeightUnit) || 'cm',
  );

  const [heightCm, setHeightCm] = useState(() => {
    if (!profile.height) return 175;

    return profile.heightUnit === 'feet'
      ? profile.height * 30.48
      : profile.height;
  });

  const handleUnitChange = (newUnit: string) => {
    if (newUnit === 'cm' || newUnit === 'feet') {
      setUnit(newUnit);
    }
  };

  const handleHeightChange = useCallback((height: number) => {
    setHeightCm(height);
  }, []);

  const handleNext = () => {
    updateProfile({
      height: unit === 'cm' ? heightCm : heightCm / 30.48,
      heightUnit: unit,
    });

    navigation.navigate('PrimaryGoalScreen');
  };

  return (
    <ScreenContainer>
      <Header
        onBack={() => navigation.goBack()}
        title={t('heightScreen.title')}
        onSkip={handleNext}
      />

      <ContentContainer>
        <UnitToggle
          options={[
            { label: 'CM', value: 'cm' },
            { label: 'Feet', value: 'feet' },
          ]}
          value={unit}
          onChange={handleUnitChange}
        />

        <HeightRuler
          value={heightCm}
          unit={unit}
          onHeightChange={handleHeightChange}
          minHeight={120}
          maxHeight={220}
        />
      </ContentContainer>

      <ButtonContainer>
        <Button title={t('common.next')} onPress={handleNext} />
      </ButtonContainer>
    </ScreenContainer>
  );
};
