import styled from 'styled-components/native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';

export const RulerContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.background};
`;

export const RulerViewport = styled.View`
  width: 100%;
  height: 420px;
  position: relative;
  margin-top: 40px;
  overflow: hidden;
  background-color: ${Colors.background};
`;

export const Tick = styled.View<{ major: boolean }>`
  position: absolute;
  left: 6px;
  height: 1px;
  background-color: ${({ major }) => (major ? Colors.white : Colors.textGray)};
  opacity: ${({ major }) => (major ? 1 : 0.85)};
`;

export const TickLabel = styled.Text<{ active: boolean }>`
  position: absolute;
  left: 70px;
  color: ${({ active }) => (active ? Colors.white : Colors.textGray)};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 700 : 400)};
`;

export const SelectionLine = styled.View`
  position: absolute;
  left: 0;
  right: 59%;
  top: 260px;
  height: 1px;
  background-color: ${Colors.blue400};
`;

export const SelectedValue = styled.Text`
  position: absolute;
  left: 42%;
  top: 260px;
  margin-top: -21px;
  color: ${Colors.white};
  font-size: 32px;
  font-family: ${Fonts.bold};
  letter-spacing: -1px;
`;

export const SelectedUnit = styled.Text`
  color: ${Colors.textGray};
  font-size: 12px;
  font-family: ${Fonts.regular};
`;
