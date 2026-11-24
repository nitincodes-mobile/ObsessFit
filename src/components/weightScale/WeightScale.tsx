import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { PanResponder, LayoutChangeEvent } from 'react-native';
import { hapticFeedback } from '../../utils/haptics';

import Svg, {
  Path,
  Line,
  Text as SvgText,
  Polygon,
  Circle,
  G,
} from 'react-native-svg';

import {
  Container,
  ScaleContainer,
  ValueContainer,
  ValueText,
  ValueUnit,
} from './weightScale.styled';

import {
  VIEW_WIDTH,
  VIEW_HEIGHT,
  CX,
  CY,
  RADIUS,
  START_ANGLE,
  END_ANGLE,
  polarToCartesian,
  clamp,
  createArcPath,
  getScaleTicks,
  SECONDARY_TICKS,
  ScaleTick,
} from './weightScale.utils';
import { Colors } from '../../theme/colors';

export interface WeightScaleProps {
  value?: number;
  onChange?: (value: number) => void;

  initialWeight?: number;
  onWeightChange?: (weight: number, unit?: string) => void;
  minWeight?: number;
  maxWeight?: number;

  min?: number;
  max?: number;
  step?: number;
  majorInterval?: number;
  unit?: string;
  units?: string[];
  decimals?: number;
  width?: number;
  height?: number;

  backgroundColor?: string;
  highlightValue?: number;
}
const WeightScaleComponent: React.FC<WeightScaleProps> = ({
  value,
  onChange,
  initialWeight = 52.5,
  onWeightChange,
  minWeight = 30,
  maxWeight = 150,
  min: propMin,
  max: propMax,
  step = 0.1,
  majorInterval = 10,
  unit = 'kg',
  decimals = 1,
  width,
  height = VIEW_HEIGHT,
  backgroundColor = 'transparent',
}) => {
  const min = propMin ?? minWeight;
  const max = propMax ?? maxWeight;

  const [internalValue, setInternalValue] = useState(value ?? initialWeight);

  const [containerWidth, setContainerWidth] = useState(width ?? VIEW_WIDTH);

  const activeValue = value ?? internalValue;
  const scaleWidth = width ?? containerWidth;

  const activeValueRef = useRef(activeValue);
  const velocityRef = useRef(0);

  const lastTouchXRef = useRef(0);
  const lastTouchTimeRef = useRef(0);

  const animationRef = useRef<number | null>(null);

  const lastVibratedTickRef = useRef(Math.round(activeValue * 10));

  // Keep the latest value available to gesture callbacks.
  activeValueRef.current = activeValue;

  // Default highlighted target.
  const resolvedHighlight = activeValue;

  // Sync externally controlled values.
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Clean up momentum animation on unmount.
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Haptic feedback when crossing a tick.
  const triggerTickHaptic = useCallback((nextValue: number) => {
    const tickIndex = Math.round(nextValue * 10);

    if (tickIndex !== lastVibratedTickRef.current) {
      lastVibratedTickRef.current = tickIndex;
      hapticFeedback('selection');
    }
  }, []);

  // Update weight and notify parent.
  const emitChange = useCallback(
    (nextValue: number) => {
      const clampedValue = clamp(nextValue, min, max);

      const roundedValue = Number(
        (Math.round(clampedValue / step) * step).toFixed(decimals),
      );

      if (roundedValue === activeValueRef.current) {
        return;
      }

      activeValueRef.current = roundedValue;

      setInternalValue(roundedValue);

      triggerTickHaptic(roundedValue);

      onChange?.(roundedValue);
      onWeightChange?.(roundedValue, unit);
    },
    [
      min,
      max,
      step,
      decimals,
      unit,
      onChange,
      onWeightChange,
      triggerTickHaptic,
    ],
  );

  // Stop existing momentum.
  const stopMomentum = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Handle momentum after releasing the dial.
  const runMomentum = useCallback(
    (initialVelocity: number) => {
      stopMomentum();

      let velocity = initialVelocity;

      const friction = 0.94;
      const minVelocity = 0.04;

      const animate = () => {
        velocity *= friction;

        if (Math.abs(velocity) > minVelocity) {
          const delta = velocity * 2.2;

          emitChange(activeValueRef.current - delta);

          animationRef.current = requestAnimationFrame(animate);
        } else {
          const snappedValue = Math.round(activeValueRef.current / step) * step;

          emitChange(snappedValue);
          hapticFeedback('selection');

          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [emitChange, step, stopMomentum],
  );

  // Pan gesture handling.
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: event => {
          stopMomentum();

          lastTouchXRef.current = event.nativeEvent.pageX;
          lastTouchTimeRef.current = Date.now();

          velocityRef.current = 0;
        },

        onPanResponderMove: event => {
          const currentX = event.nativeEvent.pageX;
          const currentTime = Date.now();

          const deltaX = currentX - lastTouchXRef.current;

          const deltaTime = Math.max(1, currentTime - lastTouchTimeRef.current);

          const unitsPerPixel = 26 / scaleWidth;

          const deltaValue = deltaX * unitsPerPixel;

          velocityRef.current = (deltaX * unitsPerPixel) / deltaTime;

          emitChange(activeValueRef.current - deltaValue);

          lastTouchXRef.current = currentX;
          lastTouchTimeRef.current = currentTime;
        },

        onPanResponderRelease: () => {
          const velocity = velocityRef.current;

          if (Math.abs(velocity) > 0.05) {
            runMomentum(velocity * 12);
          } else {
            const snappedValue =
              Math.round(activeValueRef.current / step) * step;

            emitChange(snappedValue);
            hapticFeedback('selection');
          }
        },

        onPanResponderTerminate: () => {
          velocityRef.current = 0;

          const snappedValue = Math.round(activeValueRef.current / step) * step;

          emitChange(snappedValue);
        },
      }),
    [scaleWidth, emitChange, runMomentum, step, stopMomentum],
  );

  // Measure component width.
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (width === undefined) {
        const measuredWidth = event.nativeEvent.layout.width;

        setContainerWidth(previous =>
          previous === measuredWidth ? previous : measuredWidth,
        );
      }
    },
    [width],
  );

  // Generate visible scale ticks.
  const mainTicks = useMemo(
    () =>
      getScaleTicks(activeValue, min, max, majorInterval, resolvedHighlight),
    [activeValue, min, max, majorInterval, resolvedHighlight],
  );

  // Static SVG paths.
  const outerArcPath = useMemo(() => createArcPath(RADIUS + 50, -135, 295), []);

  const mainArcPath = useMemo(
    () => createArcPath(RADIUS, START_ANGLE, END_ANGLE),
    [],
  );

  const secondaryArcPath = useMemo(
    () => createArcPath(RADIUS + 15, 235, 305),
    [],
  );

  // Outer decorative elements.
  const notchPoint = useMemo(
    () => polarToCartesian(CX, CY, RADIUS + 50, 252),
    [],
  );

  const notchTip = useMemo(
    () => polarToCartesian(CX, CY, RADIUS + 58, 252),
    [],
  );

  const handleStart = useMemo(
    () => polarToCartesian(CX, CY, RADIUS + 50, 294),
    [],
  );

  const trianglePoints = useMemo(() => {
    const tip = {
      x: CX,
      y: CY - RADIUS + 4.5,
    };

    return [
      `${tip.x},${tip.y}`,
      `${tip.x - 7.5},${tip.y - 7.5}`,
      `${tip.x + 7.5},${tip.y - 7.5}`,
    ].join(' ');
  }, []);

  const displayedNumber = activeValue.toFixed(decimals);

  return (
    <Container
      $backgroundColor={backgroundColor}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
    >
      <ScaleContainer $height={height}>
        <Svg
          width="100%"
          height={height}
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        >
          {/* Outer decorative arc */}
          <Path
            d={outerArcPath}
            stroke={Colors.charcoal}
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />

          {/* Left notch */}
          <Line
            x1={notchPoint.x}
            y1={notchPoint.y}
            x2={notchTip.x}
            y2={notchTip.y}
            stroke={Colors.blueGray700}
            strokeWidth={2.2}
            strokeLinecap="round"
          />

          {/* Right decorative handle */}
          <Circle
            cx={handleStart.x}
            cy={handleStart.y}
            r={4}
            stroke={Colors.coolGray}
          />

          <Line
            x1={handleStart.x + 4}
            y1={handleStart.y}
            x2={318}
            y2={22}
            stroke={Colors.blueGray700}
            strokeWidth={1.5}
          />

          <Circle
            cx={315}
            cy={16}
            r={5.5}
            stroke={Colors.coolGray}
            strokeWidth={1.5}
            fill={Colors.deepCharcoal}
          />

          <Circle
            cx={315}
            cy={16}
            r={3.5}
            stroke={Colors.coolGray}
            fill={Colors.coolGray}
          />

          {/* Secondary ticks */}
          <G>
            {SECONDARY_TICKS.map(tick => (
              <Line
                key={tick.key}
                x1={tick.p1.x}
                y1={tick.p1.y}
                x2={tick.p2.x}
                y2={tick.p2.y}
                stroke={Colors.slateGray}
                strokeWidth={1.2}
                strokeLinecap="round"
              />
            ))}
          </G>

          {/* Secondary arc */}
          <Path
            d={secondaryArcPath}
            stroke={Colors.deepCharcoal}
            strokeWidth={1.2}
            fill="none"
          />

          {/* Main scale arc */}
          <Path
            d={mainArcPath}
            stroke={Colors.charcoal}
            strokeWidth={1.5}
            fill="none"
          />

          {/* Main ticks and labels */}
          <G>
            {mainTicks.map((tick: ScaleTick) => (
              <G key={`tick-${tick.value}`}>
                <Line
                  x1={tick.start.x}
                  y1={tick.start.y}
                  x2={tick.end.x}
                  y2={tick.end.y}
                  stroke={tick.strokeColor}
                  strokeWidth={tick.strokeW}
                  strokeLinecap="round"
                />

                {tick.isMajor && (
                  <SvgText
                    x={tick.label.x}
                    y={tick.label.y}
                    fill={Colors.white}
                    fontSize={16}
                    fontWeight="700"
                    textAnchor="middle"
                    transform={`rotate(
                      ${tick.angle - 270},
                      ${tick.label.x},
                      ${tick.label.y}
                    )`}
                  >
                    {tick.value}
                  </SvgText>
                )}
              </G>
            ))}
          </G>

          {/* Fixed center needle */}
          <Line
            x1={CX}
            y1={CY - RADIUS + 4.5}
            x2={CX}
            y2={170}
            stroke={Colors.blue400}
            strokeWidth={1.8}
            strokeLinecap="round"
          />

          {/* Center pointer */}
          <Polygon points={trianglePoints} fill={Colors.background} />
        </Svg>
      </ScaleContainer>

      <ValueContainer pointerEvents="none">
        <ValueText>{displayedNumber}</ValueText>
        <ValueUnit>{unit}</ValueUnit>
      </ValueContainer>
    </Container>
  );
};

export const WeightScale = memo(WeightScaleComponent);

export const WeightScaleDial = WeightScale;

export default WeightScale;
