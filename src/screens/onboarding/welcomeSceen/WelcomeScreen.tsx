import React from 'react';

import { useTranslation } from 'react-i18next';
import {
  BackgroundImage,
  BlackOverlay,
  ButtonContainer,
  Container,
  ContentContainer,
  Headline,
  SubTitle,
} from './welcomeScreen.styled';
import { Button } from '../../../components/common/Button';

interface WelcomeScreenProps {
  navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('GenderScreen');
  };

  const { t } = useTranslation();

  return (
    <Container>
      <BackgroundImage
        source={require('../../../assets/images/common/onboarding.jpg')}
        resizeMode="cover"
      />
      <BlackOverlay />
      <ContentContainer>
        <Headline>{t('welcomeScreen.title')}</Headline>
        <SubTitle>{t('welcomeScreen.subTitle')}</SubTitle>
      </ContentContainer>
      <ButtonContainer>
        <Button title={t('welcomeScreen.button')} onPress={handleGetStarted} />
      </ButtonContainer>
    </Container>
  );
};
