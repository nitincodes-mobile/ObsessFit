import { Pressable, Text } from 'react-native';
import styled from 'styled-components/native';
import { Colors, BorderRadius, Spacing } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';

export const ButtonContainer = styled(Pressable)`
  background-color: ${Colors.white};
  border-radius: ${BorderRadius.md}px;
  align-items: center;
  height: 44px;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  color: ${Colors.buttonText};
  font-size: 16px;
  font-family: ${Fonts.regular};
  line-height: 20px;
`;

export const HeaderContainer = styled.View`
  position: absolute;
  top: ${Spacing.xl * 2}px;
  left: 0;
  right: 0;
  width: 100%;
  height: 168px;
`;

export const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${Spacing.lg}px;
  height: 48px;
`;

export const LeftContainer = styled.View`
  width: 50px;
  align-items: flex-start;
  justify-content: center;
`;

export const CenterContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-horizontal: ${Spacing.lg}px;
  margin-top: ${Spacing.lg}px;
`;

export const RightContainer = styled.View`
  width: 60px;
  align-items: flex-end;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${Colors.charcoal};
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.12);
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  color: ${Colors.white};
  font-size: 22px;
  font-family: ${Fonts.bold};
  text-align: center;
  line-height: 28px;
`;

export const SkipButton = styled.TouchableOpacity`
  padding-vertical: 8px;
  padding-horizontal: 10px;
`;

export const SkipText = styled.Text`
  color: ${Colors.white};
  font-size: 14px;
  font-family: ${Fonts.medium};
`;

export const SwooshContainer = styled.View`
  width: 100%;
  height: 36px;
  margin-top: 2px;
`;
