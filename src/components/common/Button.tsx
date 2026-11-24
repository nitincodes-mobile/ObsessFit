import React from 'react';
import { ButtonContainer, ButtonText } from './common.styled';
import { hapticFeedback } from '../../utils/haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, ...props }) => {
  const handlePress = () => {
    hapticFeedback('button');
    onPress();
  };

  return (
    <ButtonContainer onPress={handlePress} {...props}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};
