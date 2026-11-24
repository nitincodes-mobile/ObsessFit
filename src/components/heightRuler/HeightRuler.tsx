import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { PanResponder } from 'react-native';
import { hapticFeedback } from '../../utils/haptics';
import {
  RulerContainer,
  RulerViewport,
  Tick,
  TickLabel,
  SelectionLine,
  SelectedValue,
  SelectedUnit,
} from './heightRuler.styled';

type HeightUnit = 'cm' | 'feet';

interface HeightRulerProps {
  value: number; // Always in CM
  unit: HeightUnit;
  onHeightChange: (heightInCm: number) => void;
  minHeight?: number;
  maxHeight?: number;
}

const RULER_HEIGHT = 520;
const CENTER_Y = RULER_HEIGHT / 2;
const PIXELS_PER_CM = 12;
const VISIBLE_RANGE = 22;

export const HeightRuler: React.FC<HeightRulerProps> = ({
  value,
  unit,
  onHeightChange,
  minHeight = 120,
  maxHeight = 220,
}) => {
  const valueRef = useRef(value);
  const lastTouchY = useRef(0);
  const lastTouchTime = useRef(0);
  const velocity = useRef(0);
  const animationRef = useRef<number | null>(null);
  const lastTickRef = useRef(Math.round(value));

  // Keep current value available to gesture handlers.
  useEffect(() => {
    valueRef.current = value;
    lastTickRef.current = Math.round(value);
  }, [value]);

  const updateHeight = useCallback(
    (deltaY: number) => {
      const deltaCm = deltaY / PIXELS_PER_CM;

      const nextHeight = Math.min(
        maxHeight,
        Math.max(minHeight, valueRef.current - deltaCm),
      );

      const rounded = Math.round(nextHeight * 10) / 10;

      valueRef.current = rounded;
      onHeightChange(rounded);

      const tick = Math.round(rounded);

      if (tick !== lastTickRef.current) {
        lastTickRef.current = tick;
        hapticFeedback('selection');
      }
    },
    [minHeight, maxHeight, onHeightChange],
  );

  const stopMomentum = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const startMomentum = useCallback(
    (initialVelocity: number) => {
      stopMomentum();

      let currentVelocity = initialVelocity;
      const friction = 0.94;

      const animate = () => {
        currentVelocity *= friction;

        if (Math.abs(currentVelocity) < 0.015) {
          const snapped = Math.round(valueRef.current);

          valueRef.current = snapped;
          onHeightChange(snapped);
          hapticFeedback('selection');
          animationRef.current = null;
          return;
        }

        updateHeight(currentVelocity * 16);
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [onHeightChange, stopMomentum, updateHeight],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: event => {
          stopMomentum();

          lastTouchY.current = event.nativeEvent.pageY;
          lastTouchTime.current = Date.now();
          velocity.current = 0;
        },

        onPanResponderMove: event => {
          const currentY = event.nativeEvent.pageY;
          const currentTime = Date.now();

          const deltaY = currentY - lastTouchY.current;
          const deltaTime = Math.max(1, currentTime - lastTouchTime.current);

          velocity.current = deltaY / deltaTime;

          updateHeight(deltaY);

          lastTouchY.current = currentY;
          lastTouchTime.current = currentTime;
        },

        onPanResponderRelease: () => {
          if (Math.abs(velocity.current) > 0.08) {
            startMomentum(velocity.current);
          } else {
            const snapped = Math.round(valueRef.current);

            valueRef.current = snapped;
            onHeightChange(snapped);
            hapticFeedback('selection');
          }
        },

        onPanResponderTerminate: () => {
          stopMomentum();
        },
      }),
    [onHeightChange, startMomentum, stopMomentum, updateHeight],
  );

  useEffect(() => {
    return () => stopMomentum();
  }, [stopMomentum]);

  // Only render the visible section of the ruler.
  const ticks = useMemo(() => {
    const base = Math.round(value);

    const start = Math.max(minHeight, base - VISIBLE_RANGE);
    const end = Math.min(maxHeight, base + VISIBLE_RANGE);

    return Array.from({ length: end - start + 1 }, (_, index) => {
      const cm = start + index;

      return {
        cm,
        y: CENTER_Y + (value - cm) * PIXELS_PER_CM,
        isMajor: cm % 5 === 0,
        width: cm % 5 === 0 ? 55 : 20,
      };
    });
  }, [value, minHeight, maxHeight]);
  const formattedValue = useMemo(() => {
    if (unit === 'cm') {
      return Math.round(value).toString();
    }

    const totalInches = Math.round(value / 2.54);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;

    return `${feet}' ${inches}"`;
  }, [value, unit]);

  return (
    <RulerContainer>
      <RulerViewport {...panResponder.panHandlers}>
        {ticks.map(({ cm, y, isMajor, width }) => (
          <React.Fragment key={cm}>
            <Tick
              major={isMajor}
              style={{
                top: y,
                width,
              }}
            />
            {isMajor && (
              <TickLabel
                style={{ top: y - 10 }}
                active={cm === Math.round(value)}
              >
                {unit === 'cm' ? cm : `${Math.floor(cm / 30.48)}'`}
              </TickLabel>
            )}
          </React.Fragment>
        ))}

        <SelectionLine />

        <SelectedValue>
          {formattedValue}
          <SelectedUnit>{unit}</SelectedUnit>
        </SelectedValue>
      </RulerViewport>
    </RulerContainer>
  );
};
