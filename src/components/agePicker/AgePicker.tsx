import React, { useMemo } from 'react';
import WheelPicker from '@quidone/react-native-wheel-picker';

import {
  Container,
  PickerRow,
  AgeBox,
  AgeNumber,
  AgeLabel,
  PickerText,
  TransparentOverlay,
} from './agePicker.styled';

interface AgePickerProps {
  month: number;
  day: number;
  year: number;
  onDateChange: (date: { month: number; day: number; year: number }) => void;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 7;
const CURRENT_YEAR = new Date().getFullYear();

const monthData = MONTHS.map((label, value) => ({
  value,
  label,
}));

const yearData = Array.from({ length: 100 }, (_, i) => {
  const value = CURRENT_YEAR - i;
  return { value, label: String(value) };
});

const getAge = (year: number, month: number, day: number) => {
  const today = new Date();
  let age = today.getFullYear() - year;

  if (
    today.getMonth() < month ||
    (today.getMonth() === month && today.getDate() < day)
  ) {
    age--;
  }

  return age;
};

export const AgePicker: React.FC<AgePickerProps> = ({
  month,
  day,
  year,
  onDateChange,
}) => {
  const dayData = useMemo(() => {
    const count = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: count }, (_, i) => ({
      value: i + 1,
      label: String(i + 1),
    }));
  }, [month, year]);

  const safeDay = Math.min(day, dayData.length);
  const age = getAge(year, month, safeDay);

  const handleChange = (key: 'month' | 'day' | 'year', value: number) => {
    const updatedDate = {
      month,
      day: safeDay,
      year,
      [key]: value,
    };

    onDateChange(updatedDate);
  };

  return (
    <Container>
      <PickerRow>
        <WheelPicker
          data={monthData}
          value={month}
          onValueChanged={({ item }) => handleChange('month', item.value)}
          itemHeight={ITEM_HEIGHT}
          visibleItemCount={VISIBLE_ITEMS}
          width={140}
          itemTextStyle={PickerText}
          overlayItemStyle={TransparentOverlay}
        />

        <WheelPicker
          data={dayData}
          value={safeDay}
          onValueChanged={({ item }) => handleChange('day', item.value)}
          itemHeight={ITEM_HEIGHT}
          visibleItemCount={VISIBLE_ITEMS}
          width={80}
          itemTextStyle={PickerText}
          overlayItemStyle={TransparentOverlay}
        />

        <WheelPicker
          data={yearData}
          value={year}
          onValueChanged={({ item }) => handleChange('year', item.value)}
          itemHeight={ITEM_HEIGHT}
          visibleItemCount={VISIBLE_ITEMS}
          width={100}
          itemTextStyle={PickerText}
          overlayItemStyle={TransparentOverlay}
        />
      </PickerRow>

      <AgeBox>
        <AgeNumber>{age}</AgeNumber>
        <AgeLabel> years</AgeLabel>
      </AgeBox>
    </Container>
  );
};
