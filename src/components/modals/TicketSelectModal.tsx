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
import { CheckIcon } from '../common/Icons';

interface TicketSelectModalProps {
  visible: boolean;
  onClose: () => void;
  ticketTypes: {
    id: string;
    name: string;
    price: number;
    description: string;
    perks: string[];
    available: number;
  }[];
  onSelectTicket: (ticket: any, quantity: number) => void;
}

export const TicketSelectModal: React.FC<TicketSelectModalProps> = ({
  visible,
  onClose,
  ticketTypes,
  onSelectTicket,
}) => {
  const [selectedId, setSelectedId] = useState(ticketTypes[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  const selectedTicket = ticketTypes.find((t) => t.id === selectedId) || ticketTypes[0];

  const handleIncrement = () => {
    if (quantity < 10) setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

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

          <Text style={styles.sheetTitle}>Select Ticket Type</Text>
          <Text style={styles.sheetSubtitle}>
            Choose your race distance category and number of slots.
          </Text>

          <ScrollView style={styles.ticketsScroll}>
            {ticketTypes.map((ticket) => {
              const isSelected = selectedId === ticket.id;
              return (
                <TouchableOpacity
                  key={ticket.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedId(ticket.id)}
                  style={[
                    styles.ticketCard,
                    isSelected && styles.ticketCardSelected,
                  ]}
                >
                  <View style={styles.ticketTopRow}>
                    <Text style={[styles.ticketName, isSelected && styles.ticketNameSelected]}>
                      {ticket.name}
                    </Text>
                    <Text style={styles.ticketPrice}>₹{ticket.price}</Text>
                  </View>

                  <Text style={styles.ticketDesc}>{ticket.description}</Text>

                  <View style={styles.perksRow}>
                    {ticket.perks.map((perk, idx) => (
                      <View key={`perk-${idx}`} style={styles.perkChip}>
                        <CheckIcon size={10} color={Colors.cyan} />
                        <Text style={styles.perkText}>{perk}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <View>
              <Text style={styles.quantityTitle}>Number of Tickets</Text>
              <Text style={styles.quantitySub}>Max 10 passes per registration</Text>
            </View>

            <View style={styles.counterRow}>
              <TouchableOpacity
                onPress={handleDecrement}
                style={[styles.counterBtn, quantity === 1 && styles.counterBtnDisabled]}
                disabled={quantity === 1}
              >
                <Text style={styles.counterBtnText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.counterValue}>{quantity}</Text>

              <TouchableOpacity onPress={handleIncrement} style={styles.counterBtn}>
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Total & Proceed Button */}
          <View style={styles.footerRow}>
            <View style={styles.totalWrap}>
              <Text style={styles.totalLabel}>TOTAL PAYABLE</Text>
              <Text style={styles.totalAmount}>
                ₹{(selectedTicket?.price || 0) * quantity}
              </Text>
            </View>

            <View style={styles.proceedButtonWrap}>
              <Button
                title="Review Booking"
                onPress={() => onSelectTicket(selectedTicket, quantity)}
                variant="glow"
              />
            </View>
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
    maxHeight: '85%',
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
    marginBottom: Spacing.md,
  },
  ticketsScroll: {
    maxHeight: 280,
  },
  ticketCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm + 4,
  },
  ticketCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#151E2E',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  ticketTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ticketName: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  ticketNameSelected: {
    color: Colors.textPrimary,
  },
  ticketPrice: {
    color: Colors.cyan,
    fontSize: 16,
    fontWeight: '800',
  },
  ticketDesc: {
    color: Colors.textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  perksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  perkChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    gap: 4,
  },
  perkText: {
    color: Colors.cyan,
    fontSize: 10,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.sm,
  },
  quantityTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  quantitySub: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnDisabled: {
    opacity: 0.4,
  },
  counterBtnText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  counterValue: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    minWidth: 20,
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  totalWrap: {
    gap: 2,
  },
  totalLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  totalAmount: {
    color: Colors.cyan,
    fontSize: 22,
    fontWeight: '800',
  },
  proceedButtonWrap: {
    width: 170,
  },
});
