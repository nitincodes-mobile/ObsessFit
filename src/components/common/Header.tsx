import React from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { ArrowLeftIcon } from './Icons';
import { Colors } from '../../theme/colors';
import { useTranslation } from 'react-i18next';
import { hapticFeedback } from '../../utils/haptics';
import {
  BackButton,
  CenterContainer,
  HeaderContainer,
  HeaderTitle,
  LeftContainer,
  RightContainer,
  SkipButton,
  SkipText,
  TopRow,
  SwooshContainer,
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
  const { width: screenWidth = 390 } = useWindowDimensions();

  const handleBack = () => {
    hapticFeedback('button');
    onBack?.();
  };

  const handleSkip = () => {
    hapticFeedback('button');
    onSkip?.();
  };

  const progressWidth = Math.max(70);

  return (
    <HeaderContainer>
      <TopRow>
        <LeftContainer>
          {showBack && onBack ? (
            <BackButton onPress={handleBack} hitSlop={10}>
              <ArrowLeftIcon size={18} color={Colors.white} />
            </BackButton>
          ) : null}
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

      {title ? (
        <CenterContainer>
          <HeaderTitle>{title}</HeaderTitle>
        </CenterContainer>
      ) : null}

      <SwooshContainer pointerEvents="none">
        <Svg
          width={screenWidth}
          height={36}
          viewBox={`0 0 ${screenWidth} 36`}
          fill="none"
        >
          <Defs>
            <LinearGradient id="swooshGrad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor={Colors.blue400} stopOpacity="1" />
              <Stop
                offset="80%"
                stopColor={Colors.blue400}
                stopOpacity="0.85"
              />
              <Stop offset="100%" stopColor={Colors.blue400} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path
            d={`M 2 0 C 2 24 16 34 44 34 L ${progressWidth} 34`}
            stroke="url(#swooshGrad)"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
        </Svg>
      </SwooshContainer>
    </HeaderContainer>
  );
};
