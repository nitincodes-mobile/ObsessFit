import React, { useState } from 'react';
import { useFitness } from '../../../context/FitnessContext';
import { Header } from '../../../components/common/Header';
import { UnitToggle } from '../../../components/unitToggle';
import {
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './weightScreen.styled';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/common/Button';
import { WeightScale } from '../../../components/weightScale';

interface WeightScreenProps {
  navigation: any;
}

type WeightUnit = 'kg' | 'lbs';

export const WeightScreen: React.FC<WeightScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { profile, updateProfile } = useFitness();

  const [weight, setWeight] = useState<number>(profile.weight || 52.5);
  const [unit, setUnit] = useState<WeightUnit>(profile.weightUnit || 'kg');

  const handleUnitChange = (newUnit: string) => {
    if (newUnit === unit) return;

    const converted = newUnit === 'lbs' ? weight * 2.20462 : weight / 2.20462;

    setWeight(Math.round(converted * 10) / 10);
    setUnit(newUnit as WeightUnit);
  };

  const handleNext = () => {
    updateProfile({ weight, weightUnit: unit });
    navigation.navigate('HeightScreen');
  };

  return (
    <ScreenContainer>
      <Header
        onBack={() => navigation.goBack()}
        title={t('weightScreen.title')}
        onSkip={handleNext}
      />

      <ContentContainer>
        <UnitToggle
          options={[
            { label: 'Kg', value: 'kg' },
            { label: 'Lbs', value: 'lbs' },
          ]}
          value={unit}
          onChange={handleUnitChange}
        />
        <WeightScale
          value={weight}
          onChange={setWeight}
          min={unit === 'kg' ? 30 : 66}
          max={unit === 'kg' ? 150 : 330}
          step={0.1}
          majorInterval={10}
          unit={unit}
          units={['kg', 'lbs']}
        />
      </ContentContainer>

      <ButtonContainer>
        <Button title={t('common.next')} onPress={handleNext} />
      </ButtonContainer>
    </ScreenContainer>
  );
};
