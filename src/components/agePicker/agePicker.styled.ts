import styled from 'styled-components/native';
import { Fonts } from '../../theme/fonts';
import { Colors, Spacing, BorderRadius } from '../../theme/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.background};
  align-items: center;
  padding-top: ${Spacing.xl}px;
`;

export const PickerRow = styled.View`
  width: 98%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PickerText = {
  color: Colors.white,
  fontSize: 18,
  fontFamily: Fonts.regular,
};

export const TransparentOverlay = {
  backgroundColor: 'transparent',
};

export const AgeBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: 60px;
  padding-horizontal: ${Spacing.xl + Spacing.md}px;
  padding-vertical: ${Spacing.md + 2}px;
  border-radius: ${BorderRadius.xl}px;
  border-width: 2px;
  border-color: ${Colors.whiteTranslucent20};
  elevation: 6;
`;

export const AgeNumber = styled.Text`
  color: ${Colors.white};
  font-size: 36px;
  font-family: ${Fonts.bold};
`;

export const AgeLabel = styled.Text`
  color: ${Colors.whiteTranslucent20};
  font-size: 14px;
  margin-bottom: 6px;
  font-family: ${Fonts.bold};
`;
