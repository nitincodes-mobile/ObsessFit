import React, { useState } from 'react';
import { Header } from '../../../components/common/Header';
import { Button } from '../../../components/common/Button';
import { useFitness } from '../../../context/FitnessContext';
import {
  ButtonContainer,
  ContentContainer,
  ScreenContainer,
} from './targetDateScreen.styled';
import { useTranslation } from 'react-i18next';
import { SelectionList } from '../../../components/SelectionList';
import { CalendarIcon, WatchIcon } from '../../../components/common/Icons';

interface TargetDateScreenProps {
  navigation: any;
}

export const TargetDateScreen: React.FC<TargetDateScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { profile, updateProfile } = useFitness();
  const [selectedTimeline, setSelectedTimeline] = useState<string>(
    profile.targetTimeline || '3-6 Months',
  );

  const timelines = [
    {
      id: '30_days',
      title: 'targetTimelineScreen.timelines.in30Days',
      Icon: CalendarIcon,
    },
    {
      id: '60_days',
      title: 'targetTimelineScreen.timelines.in60Days',
      Icon: CalendarIcon,
    },
    {
      id: '90_days',
      title: 'targetTimelineScreen.timelines.in90Days',
      Icon: CalendarIcon,
    },
    {
      id: '180_days',
      title: 'targetTimelineScreen.timelines.in180Days',
      Icon: CalendarIcon,
    },
    {
      id: 'No deadline / lifestyle change',
      title: 'targetTimelineScreen.timelines.noDeadline',
      Icon: WatchIcon,
    },
  ];

  const handleNext = () => {
    updateProfile({ targetTimeline: selectedTimeline });
    navigation.navigate('ActivityLevelScreen');
  };

  return (
    <ScreenContainer>
      <Header
        onBack={navigation.goBack}
        title={t('targetTimelineScreen.title')}
        onSkip={handleNext}
      />

      <ContentContainer>
        <SelectionList
          data={timelines}
          selectedValue={selectedTimeline}
          onSelect={setSelectedTimeline}
        />
      </ContentContainer>

      <ButtonContainer>
        <Button title={t('common.next')} onPress={handleNext} />
      </ButtonContainer>
    </ScreenContainer>
  );
};
