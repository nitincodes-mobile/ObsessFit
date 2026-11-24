import styled from 'styled-components/native';
import { Fonts } from '../../theme/fonts';
import { Colors } from '../../theme/colors';

export const Track = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  width: 120px;
  height: 44px;
  padding: 6px;
  border-radius: 33px;
  border-width: 1px;
  border-color: ${Colors.border};
  background-color: ${Colors.background};
`;

export const Thumb = styled.View<{ selected: boolean }>`
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: ${({ selected }) => (selected ? '6px' : '50%')};
  width: 50%;
  border-radius: 22px;
  border-width: 1px;
  border-color: ${Colors.thumbBorder};
  background-color: ${Colors.thumbBackground};
`;

export const Segment = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-family: ${Fonts.semiBold};
`;
