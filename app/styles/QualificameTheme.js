import { assign } from "lodash";
import Colors from 'qualificame-native/app/styles/Colors';

// Colors
export const colors = [
  Colors.green, 
  Colors.blue, 
  Colors.orange, 
  Colors.pink, 
  Colors.dark, 
  Colors.red
];

// Typography
const sansSerif =
  "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
const letterSpacing = "normal";
const fontSize = 12;

// Layout
const baseProps = {
  width: 450,
  height: 300,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },      // TODO: padding para el chart cuenta el padding para baseLabelStyles
  colorScale: colors
};

// Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 5,
  fill: Colors.dark,
  stroke: "transparent",
  strokeWidth: 0
};
const centeredLabelStyles = assign({ textAnchor: "end" }, baseLabelStyles);

// Strokes
const strokeDasharray = "8, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Put it all together...
export default {
  area: assign({
    style: {
      data: {
        stroke: colors.blue,
        strokeWidth: 1.5
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  axis: assign({
    style: {
      axis: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0,
        strokeLinecap,
        strokeLinejoin                   // en Figma no tienen stroke los axis
      },
      axisLabel: assign({}, centeredLabelStyles, {
        padding: 5
      }),
      grid: {
        fill: "none",
        stroke: "transparent",
        pointerEvents: "painted"
      },
      ticks: {
        fill: "transparent",
        size: 1,
        stroke: "transparent"
      },
      tickLabels:  assign({}, baseLabelStyles, {
        padding: 3,
        fontSize: 15
      }),
    }
  }, baseProps),
  bar: assign({
    style: {
      data: {
        fill: Colors.blue,
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: baseLabelStyles
    },
    cornerRadius: 1.5,
    barRatio: 1
  }, baseProps),
  chart: baseProps,
  group: assign({
    colorScale: colors
  }, baseProps),
  legend: {
	gutter: 7,
	symbolSpacer: 6,
	rowGutter: {bottom: 1, top: 1},
    orientation: "horizontal",
    itemsPerRow: 3,
    titleOrientation: "top",
    style: {
      data: {
        type: "circle"
      },
      labels: assign({}, baseLabelStyles, { fontSize: 14, fill: Colors.dark}),
      title: assign({}, baseLabelStyles, { padding: 5 })
    }
  },
  line: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: colors.blue,
        strokeWidth: 1.5
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  pie: assign(
    {
      colorScale: colors,
      style: {
        data: {
          padding: 0,
          stroke: "transparent",
          strokeWidth: 1
        },
        labels: assign({}, baseLabelStyles, { padding: 20 })
      },
      width: 400,
      height: 400,
      padding: 0
    },
    baseProps
  ),
  scatter: assign({
    style: {
      data: {
        fill: Colors.white,
        stroke: colors.blue,
        strokeWidth: 1
      },
      labels: centeredLabelStyles
    },
    symbol: "circle",
    size: 4
  }, baseProps),
  stack: assign({
    colorScale: colors
  }, baseProps),
  tooltip: {
    style: assign({}, centeredLabelStyles, { padding: 3, pointerEvents: "none" }),
    flyoutStyle: {
      stroke: Colors.dark,
      strokeWidth: 0,
      fill: Colors.blue,
      pointerEvents: "none"
    },
    cornerRadius: 0,
    pointerLength: 5
  }
};
