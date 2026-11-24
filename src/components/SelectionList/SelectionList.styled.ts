import styled from 'styled-components/native';
import { BorderRadius, Colors, Spacing } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';

export const SelectionCard = styled.TouchableOpacity<{
  isSelected: boolean;
}>`
  flex-direction: row;
  height: 44px;
  align-items: center;
  background-color: ${Colors.background};
  border-width: 1.5px;
  border-color: ${({ isSelected }) =>
    isSelected ? Colors.blue400 : Colors.thumbBorder};
  border-radius: ${BorderRadius.md}px;
  padding-horizontal: ${Spacing.md}px;
  margin-bottom: ${Spacing.sm + 2}px;
`;

export const IconContainer = styled.View<{
  isSelected: boolean;
}>`
  width: 24px;
  height: 24px;
  border-radius: 22px;
  background-color: ${({ isSelected }) =>
    isSelected ? '#2F80ED33' : Colors.charcoal};
  align-items: center;
  justify-content: center;
  margin-right: ${Spacing.md}px;
`;

export const SelectionTitle = styled.Text<{
  isSelected: boolean;
}>`
  flex: 1;
  color: ${Colors.white};
  font-size: 13px;
  font-family: ${Fonts.regular};
`;

export const RadioCircle = styled.View<{
  isSelected: boolean;
}>`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border-width: 1.5px;
  border-color: ${({ isSelected }) =>
    isSelected ? Colors.blue400 : Colors.thumbBorder};
  background-color: ${({ isSelected }) =>
    isSelected ? Colors.blue400 : 'transparent'};
  align-items: center;
  justify-content: center;
`;

export const RadioInner = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${Colors.white};
`;
