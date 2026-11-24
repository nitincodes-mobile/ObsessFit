import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../../theme/colors';

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: flex-end;
  background-color: ${Colors.background};
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin-top: ${Spacing.xxl * 2}px;
  align-items: center;
  justify-content: center;
  padding: ${Spacing.xs}px ${Spacing.xs}px;
  padding-bottom: ${Spacing.xxl + 10}px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  bottom: ${Spacing.xs - 38}px;
  padding: ${Spacing.xl}px ${Spacing.lg}px;
  position: absolute;
`;
