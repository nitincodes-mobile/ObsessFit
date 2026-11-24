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

export const HeaderBackgroundImage = styled.Image`
  position: absolute;
  top: -15px;
  left: -5px;
  width: 100%;
  height: 168px;
`;

export const HeaderContainer = styled.View`
  position: absolute;
  top: ${Spacing.xl * 2}px;
  left: 0;
  right: 0;
  width: 100%;
  height: 168px;
  overflow: hidden;
  z-index: 10;
`;
export const TopRow = styled.View`
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  height: 42px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${Spacing.lg}px;
  z-index: 2;
`;

export const LeftContainer = styled.View`
  width: 60px;
  align-items: flex-start;
  justify-content: center;
`;

export const CenterContainer = styled.View`
  position: absolute;
  top: 84px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

export const RightContainer = styled.View`
  width: 60px;
  align-items: flex-end;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: transparent;
  border-width: 1px;
  border-color: #222222;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: ${Fonts.semiBold};
  text-align: center;
`;

export const SkipButton = styled.TouchableOpacity`
  padding-vertical: 10px;
`;

export const SkipText = styled.Text`
  color: ${Colors.white};
  font-size: 12px;
  font-family: ${Fonts.regular};
`;
