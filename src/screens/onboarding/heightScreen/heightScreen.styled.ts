import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../../theme/colors';

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.background};
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${Spacing.lg}px;
  margin-top: 10%;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding-horizontal: ${Spacing.lg}px;
  bottom: ${Spacing.xs - 6}px;
`;
