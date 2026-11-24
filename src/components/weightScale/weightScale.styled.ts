import styled from 'styled-components/native';
import { Fonts } from '../../theme/fonts';

interface ContainerProps {
  $backgroundColor: string;
}

interface ScaleContainerProps {
  $height: number;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  align-items: center;
  padding-vertical: 4px;
  overflow: hidden;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const ScaleContainer = styled.View<ScaleContainerProps>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  align-items: center;
  justify-content: center;
`;

export const ValueContainer = styled.View`
  margin-top: 24px;
  width: 140px;
  height: 78px;
  border-radius: 39px;
  border-width: 2.5px;
  border-color: #26282e;
  background-color: #141416;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  shadow-color: #000000;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  elevation: 6;
`;

export const ValueText = styled.Text`
  color: #ffffff;
  font-size: 28px;
  font-family: ${Fonts.semiBold};
`;

export const ValueUnit = styled.Text`
  color: #7a808c;
  font-size: 16px;
  font-weight: 500;
  margin-left: 6px;
  margin-bottom: -6px;
`;
