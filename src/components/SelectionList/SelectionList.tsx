import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import {
  SelectionCard,
  IconContainer,
  SelectionTitle,
  RadioCircle,
  RadioInner,
} from './SelectionList.styled';
import { Colors } from '../../theme/colors';
import { useTranslation } from 'react-i18next';
import { hapticFeedback } from '../../utils/haptics';

export interface SelectionItem {
  id: string;
  title: string;
  Icon?: React.ComponentType<{
    size?: number;
    color?: string;
  }>;
}

interface SelectionListProps {
  data: SelectionItem[];
  selectedValue: string;
  onSelect: (id: string) => void;
  keyExtractor?: (item: SelectionItem) => string;
  contentPaddingBottom?: number;
}

interface SelectionItemProps {
  item: SelectionItem;
  isSelected: boolean;
  t: (key: string) => string;
  onSelect: (id: string) => void;
}

const SelectionRow = memo<SelectionItemProps>(
  ({ item, isSelected, onSelect, t }) => {
    const ItemIcon = item.Icon;

    return (
      <SelectionCard
        isSelected={isSelected}
        activeOpacity={0.8}
        onPress={() => {
          hapticFeedback('selection');
          onSelect(item.id);
        }}
      >
        {ItemIcon && (
          <IconContainer isSelected={isSelected}>
            <ItemIcon
              size={24}
              color={isSelected ? Colors.blue400 : Colors.white}
            />
          </IconContainer>
        )}

        <SelectionTitle isSelected={isSelected}>{t(item.title)}</SelectionTitle>

        <RadioCircle isSelected={isSelected}>
          {isSelected && <RadioInner />}
        </RadioCircle>
      </SelectionCard>
    );
  },
);

export const SelectionList: React.FC<SelectionListProps> = ({
  data,
  selectedValue,
  onSelect,
  keyExtractor,
  contentPaddingBottom = 20,
}) => {
  const { t } = useTranslation();

  const renderItem: ListRenderItem<SelectionItem> = useCallback(
    ({ item }) => (
      <SelectionRow
        item={item}
        isSelected={selectedValue === item.id}
        onSelect={onSelect}
        t={t}
      />
    ),
    [selectedValue, onSelect, t],
  );

  const extractKey = useCallback(
    (item: SelectionItem) => (keyExtractor ? keyExtractor(item) : item.id),
    [keyExtractor],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={extractKey}
      showsVerticalScrollIndicator={false}
      extraData={selectedValue}
      contentContainerStyle={{
        paddingBottom: contentPaddingBottom,
      }}
      initialNumToRender={5}
      windowSize={5}
    />
  );
};
