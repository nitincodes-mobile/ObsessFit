import React from 'react';
import { ArrowLeftIcon } from './Icons';
import { Colors } from '../../theme/colors';
import { useTranslation } from 'react-i18next';
import { hapticFeedback } from '../../utils/haptics';
import {
  BackButton,
  CenterContainer,
  HeaderBackgroundImage,
  HeaderContainer,
  HeaderTitle,
  LeftContainer,
  RightContainer,
  SkipButton,
  SkipText,
  TopRow,
} from './common.styled';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  onSkip?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onSkip,
  showBack = true,
  rightAction,
}) => {
  const { t } = useTranslation();

  const handleBack = () => {
    hapticFeedback('button');
    onBack?.();
  };

  const handleSkip = () => {
    hapticFeedback('button');
    onSkip?.();
  };

  return (
    <HeaderContainer>
      <HeaderBackgroundImage
        source={require('../../assets/images/common/headerBackground.png')}
        resizeMode="cover"
      />

      <TopRow>
        <LeftContainer>
          {showBack && onBack && (
            <BackButton onPress={handleBack} hitSlop={10}>
              <ArrowLeftIcon size={22} color={Colors.white} />
            </BackButton>
          )}
        </LeftContainer>

        <RightContainer>
          {onSkip ? (
            <SkipButton onPress={handleSkip}>
              <SkipText>{t('common.skip')}</SkipText>
            </SkipButton>
          ) : (
            rightAction
          )}
        </RightContainer>
      </TopRow>

      <CenterContainer>
        {title && <HeaderTitle>{title}</HeaderTitle>}
      </CenterContainer>
    </HeaderContainer>
  );
};
