import styled from 'styled-components/native';
import { Colors, Spacing } from '../../../theme/colors';
import { Fonts } from '../../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${Colors.background};
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const BlackOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${Spacing.xl}px ${Spacing.lg}px;
  padding-bottom: ${Spacing.xxl + 10}px;
`;

export const Headline = styled.Text`
  color: ${Colors.white};
  font-size: 28px;
  font-family: ${Fonts.bold};
  line-height: 36px;
  text-align: center;
  margin-bottom: ${Spacing.sm}px;
  letter-spacing: 0;
`;

export const SubTitle = styled.Text`
  color: ${Colors.white};
  font-size: 14px;
  line-height: 18px;
  font-family: ${Fonts.regular};
  text-align: center;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  bottom: ${Spacing.xs - 12}px;
  padding: ${Spacing.xl}px ${Spacing.lg}px;
  position: absolute;
`;
