import React from 'react';

import {
  GenderContainer,
  GenderOption,
  GenderIconContainer,
  GenderLabel,
} from './gender.styled';
import { Colors } from '../../../theme/colors';
import {
  FemaleIcon,
  GenderOtherIcon,
  MaleIcon,
} from '../../../components/common/Icons';

interface GenderSelectionProps {
  selectedGender: 'Male' | 'Female' | 'Other';
  onSelect: (gender: 'Male' | 'Female' | 'Other') => void;
}

const genderOptions = [
  { id: 'Male', label: 'Male', Icon: MaleIcon },
  { id: 'Female', label: 'Female', Icon: FemaleIcon },
  { id: 'Other', label: 'Other', Icon: GenderOtherIcon },
] as const;

export const GenderSelection: React.FC<GenderSelectionProps> = ({
  selectedGender,
  onSelect,
}) => {
  return (
    <GenderContainer>
      {genderOptions.map(({ id, label, Icon }) => {
        const isSelected = selectedGender === id;
        return (
          <GenderOption key={id} onPress={() => onSelect(id)}>
            <GenderIconContainer selected={isSelected}>
              <Icon size={26} color={Colors.white} />
            </GenderIconContainer>

            <GenderLabel>{label}</GenderLabel>
          </GenderOption>
        );
      })}
    </GenderContainer>
  );
};
