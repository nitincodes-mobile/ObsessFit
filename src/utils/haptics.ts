import { Vibration, Platform } from 'react-native';

export type HapticFeedbackType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'selection'
  | 'button';

/**
 * Common haptic feedback function for user interactions across the app.
 *
 * @param type The type of haptic feedback to trigger:
 *   - 'selection' | 'light': Subtle tick for scale dials, rulers, and toggles.
 *   - 'button' | 'medium': Firm tactile bump on button presses.
 *   - 'heavy': Stronger confirmation pulse.
 */
export const hapticFeedback = (type: HapticFeedbackType = 'selection'): void => {
  try {
    switch (type) {
      case 'button':
      case 'medium':
        // Distinct tactile pulse on button press
        Vibration.vibrate(Platform.OS === 'android' ? 15 : undefined);
        break;
      case 'heavy':
        // Stronger feedback for confirmations
        Vibration.vibrate(Platform.OS === 'android' ? 30 : undefined);
        break;
      case 'selection':
      case 'light':
      default:
        // Subtle tick for scale dials, ticks, and rulers
        Vibration.vibrate(Platform.OS === 'android' ? 6 : undefined);
        break;
    }
  } catch {
    // Graceful fallback on devices/environments without vibration support
  }
};

export const triggerHaptic = hapticFeedback;
export default hapticFeedback;
