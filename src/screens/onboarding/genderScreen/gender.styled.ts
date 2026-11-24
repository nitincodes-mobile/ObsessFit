import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../../theme/colors';
import { Fonts } from '../../../theme/fonts';

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.background};
`;

export const GenderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  align-self: center;
  margin-bottom: ${Spacing.xxl + 20}px;
`;

export const GenderOption = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const GenderIconContainer = styled.View<{ selected: boolean }>`
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${props =>
    props.selected ? Colors.googleBlue30 : Colors.whiteTranslucent20};
`;

export const GenderLabel = styled.Text`
  color: ${Colors.white};
  font-size: 14px;
  margin-top: ${Spacing.sm}px;
  font-weight: 600;
  font-family: ${Fonts.semiBold};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  bottom: ${Spacing.xs - 12}px;
  padding: ${Spacing.xl}px ${Spacing.lg}px;
  position: absolute;
`;

export const BottomText = styled.Text`
  color: ${Colors.white};
  font-size: 10px;
  font-weight: 400;
  font-family: ${Fonts.regular};
  text-align: center;
  margin-bottom: ${Spacing.sm}px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${Spacing.xxl};
  padding: ${Spacing.xl}px ${Spacing.lg}px;
  padding-bottom: ${Spacing.xxl + 10}px;
`;
