import { Colors } from '../../theme/colors';

export interface Point {
  x: number;
  y: number;
}

export interface ScaleTick {
  value: number;
  isMajor: boolean;
  isHighlight: boolean;
  start: Point;
  end: Point;
  label: Point;
  angle: number;
  strokeColor: string;
  strokeW: number;
}

export interface SecondaryTick {
  key: string;
  p1: Point;
  p2: Point;
}

export const VIEW_WIDTH = 390;
export const VIEW_HEIGHT = 215;

export const CX = 195;
export const CY = 305;
export const RADIUS = 235;

export const START_ANGLE = 210;
export const END_ANGLE = 330;
export const DEG_PER_UNIT = 2.78;

export const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number,
): Point => {
  const radians = (angle * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const createArcPath = (
  radius: number,
  startAngle: number,
  endAngle: number,
): string => {
  const start = polarToCartesian(CX, CY, radius, startAngle);
  const end = polarToCartesian(CX, CY, radius, endAngle);

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
};

export const getScaleTicks = (
  centerValue: number,
  min: number,
  max: number,
  majorInterval: number,
  highlightValue: number,
): ScaleTick[] => {
  const ticks: ScaleTick[] = [];

  const visibleRange = 26;

  const firstValue = Math.max(min, Math.floor(centerValue - visibleRange));

  const lastValue = Math.min(max, Math.ceil(centerValue + visibleRange));

  for (let value = firstValue; value <= lastValue; value++) {
    const angle = 270 + (value - centerValue) * DEG_PER_UNIT;

    if (angle < START_ANGLE - 2 || angle > END_ANGLE + 2) {
      continue;
    }

    const isMajor = value % majorInterval === 0;
    const isMiddle = value % (majorInterval / 2) === 0 && !isMajor;
    const isHighlight = value === highlightValue;

    let innerRadius = RADIUS - 18;
    let strokeColor = Colors.blueGray;
    let strokeW = 2;

    if (isMajor) {
      innerRadius = RADIUS - 45;
      strokeColor = Colors.white;
      strokeW = 3.2;
    } else if (isHighlight) {
      innerRadius = RADIUS - 42;
      strokeColor = Colors.blue400;
      strokeW = 5.5;
    } else if (isMiddle) {
      innerRadius = RADIUS - 30;
      strokeColor = Colors.coolGray;
      strokeW = 2.4;
    }

    ticks.push({
      value,
      isMajor,
      isHighlight,
      start: polarToCartesian(CX, CY, RADIUS, angle),
      end: polarToCartesian(CX, CY, innerRadius, angle),
      label: polarToCartesian(CX, CY, RADIUS - 67, angle),
      angle,
      strokeColor,
      strokeW,
    });
  }

  return ticks;
};

export const getSecondaryTicks = (): SecondaryTick[] => {
  const ticks: SecondaryTick[] = [];

  for (let angle = 236; angle <= 304; angle += 1.6) {
    ticks.push({
      key: `secondary-${angle}`,
      p1: polarToCartesian(CX, CY, RADIUS + 16, angle),
      p2: polarToCartesian(CX, CY, RADIUS + 24, angle),
    });
  }

  return ticks;
};

export const SECONDARY_TICKS = getSecondaryTicks();
