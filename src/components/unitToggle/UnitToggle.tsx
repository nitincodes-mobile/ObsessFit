import React, { useState } from 'react';
import { Label, Segment, Thumb, Track } from './unitToggle.styled';
import { hapticFeedback } from '../../utils/haptics';

export type Unit = 'kg' | 'lbs' | 'cm' | 'ft' | 'km' | 'miles';

export interface UnitOption {
  value: string;
  label: string;
}

interface UnitToggleProps {
  options: UnitOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (unit: string) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({
  options,
  value,
  defaultValue,
  onChange,
}) => {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);

  const selected = value ?? internal;

  const handlePress = (unit: string) => {
    hapticFeedback('selection');
    if (value === undefined) {
      setInternal(unit);
    }
    onChange?.(unit);
  };

  return (
    <Track>
      <Thumb
        selected={options.findIndex(option => option.value === selected) === 0}
      />

      {options.map(option => (
        <Segment key={option.value} onPress={() => handlePress(option.value)}>
          <Label>{option.label}</Label>
        </Segment>
      ))}
    </Track>
  );
};

export default UnitToggle;
