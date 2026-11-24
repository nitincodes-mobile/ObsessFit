import React, { useState } from 'react';
import { Header } from '../../../components/common/Header';
import { Button } from '../../../components/common/Button';
import { useFitness } from '../../../context/FitnessContext';
import {
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './targetWeight.styled';
import { UnitToggle } from '../../../components/unitToggle';
import { WeightScale } from '../../../components/weightScale';
import { useTranslation } from 'react-i18next';

interface TargetWeightScreenProps {
  navigation: any;
}

type WeightUnit = 'kg' | 'lbs';

export const TargetWeightScreen: React.FC<TargetWeightScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { profile, updateProfile } = useFitness();
  const [unit, setUnit] = useState<WeightUnit>(profile.weightUnit || 'kg');
  const [targetWeight, setTargetWeight] = useState<number>(
    profile.targetWeight || 72.0,
  );

  const handleUnitChange = (newUnit: string) => {
    if (newUnit === unit) return;

    const converted =
      newUnit === 'lbs' ? targetWeight * 2.20462 : targetWeight / 2.20462;

    setTargetWeight(Math.round(converted * 10) / 10);
    setUnit(newUnit as WeightUnit);
  };

  const handleNext = () => {
    updateProfile({ targetWeight });
    navigation.navigate('TargetDateScreen');
  };

  return (
    <ScreenContainer>
      <Header
        onBack={() => navigation.goBack()}
        title={t('targetWeightScreen.title')}
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
          value={targetWeight}
          onChange={setTargetWeight}
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
