import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../theme/colors';
import { Button } from '../common/Button';
import { ClockIcon } from '../common/Icons';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  eventDate?: string;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  eventDate: _eventDate = 'Sun, 29 Mar 2026',
}) => {
  const dates = [
    { day: 'Sun', date: '29', month: 'Mar', full: 'Sun, 29 Mar 2026' },
    { day: 'Mon', date: '30', month: 'Mar', full: 'Mon, 30 Mar 2026' },
    { day: 'Tue', date: '31', month: 'Mar', full: 'Tue, 31 Mar 2026' },
    { day: 'Wed', date: '01', month: 'Apr', full: 'Wed, 01 Apr 2026' },
    { day: 'Thu', date: '02', month: 'Apr', full: 'Thu, 02 Apr 2026' },
    { day: 'Fri', date: '03', month: 'Apr', full: 'Fri, 03 Apr 2026' },
    { day: 'Sat', date: '04', month: 'Apr', full: 'Sat, 04 Apr 2026' },
  ];

  const timeSlots = [
    { id: 'slot-1', time: '05:30 AM', label: 'Flag-Off Elite' },
    { id: 'slot-2', time: '06:15 AM', label: 'General Batch 1' },
    { id: 'slot-3', time: '07:00 AM', label: 'Fun Run Batch 2' },
  ];

  const [selectedDateObj, setSelectedDateObj] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0].id);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity style={styles.dismissOverlay} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.dragHandle} />

          <Text style={styles.sheetTitle}>When would you like to visit?</Text>
          <Text style={styles.sheetSubtitle}>
            Select your preferred participation date and reporting slot.
          </Text>

          {/* Horizontal Date Chips */}
          <Text style={styles.sectionLabel}>SELECT DATE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesRow}
          >
            {dates.map((item, idx) => {
              const isSelected = selectedDateObj.full === item.full;
              return (
                <TouchableOpacity
                  key={`d-${idx}`}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDateObj(item)}
                  style={[
                    styles.dateChip,
                    isSelected && styles.dateChipSelected,
                  ]}
                >
                  <Text style={[styles.dateChipDay, isSelected && styles.dateChipDaySelected]}>
                    {item.day}
                  </Text>
                  <Text style={[styles.dateChipNum, isSelected && styles.dateChipNumSelected]}>
                    {item.date}
                  </Text>
                  <Text style={[styles.dateChipMonth, isSelected && styles.dateChipMonthSelected]}>
                    {item.month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Time Slots */}
          <Text style={styles.sectionLabel}>REPORTING TIME SLOT</Text>
          <View style={styles.slotsContainer}>
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot === slot.id;
              return (
                <TouchableOpacity
                  key={slot.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedSlot(slot.id)}
                  style={[
                    styles.slotCard,
                    isSelected && styles.slotCardSelected,
                  ]}
                >
                  <ClockIcon
                    size={16}
                    color={isSelected ? Colors.cyan : Colors.textSecondary}
                  />
                  <View style={styles.slotTexts}>
                    <Text style={[styles.slotTime, isSelected && styles.slotTimeSelected]}>
                      {slot.time}
                    </Text>
                    <Text style={styles.slotLabel}>{slot.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Continue CTA */}
          <View style={styles.ctaRow}>
            <Button
              title="Continue to Tickets"
              onPress={() => onSelectDate(selectedDateObj.full)}
              variant="glow"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  dismissOverlay: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl + 10,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  dragHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.borderLight,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sheetTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  sheetSubtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  datesRow: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dateChip: {
    width: 62,
    height: 82,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  dateChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.cyan,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  dateChipDay: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  dateChipDaySelected: {
    color: '#FFFFFF',
  },
  dateChipNum: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  dateChipNumSelected: {
    color: '#FFFFFF',
  },
  dateChipMonth: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  dateChipMonthSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  slotsContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  slotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  slotCardSelected: {
    borderColor: Colors.cyan,
    backgroundColor: '#162235',
  },
  slotTexts: {
    gap: 2,
  },
  slotTime: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  slotTimeSelected: {
    color: Colors.cyan,
  },
  slotLabel: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  ctaRow: {
    width: '100%',
  },
});
