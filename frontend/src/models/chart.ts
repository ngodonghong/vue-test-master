type ColRole = 'annotation' | 'annotationText' | 'domain' | 'data';
type AxisFormat = 'none' | 'decimal' | 'scientific' | 'currency' | 'percent' | 'short' | 'long';
type ColType = 'boolean' | 'number' | 'string' | 'date' | 'datetime' | 'timeofday';
type Position = 'bottom' | 'left' | 'in' | 'none' | 'right' | 'top';
type CurveType = 'function' | 'none';
type alignment = 'start' | 'center' | 'end';
type AnnotationStyle = 'line' | 'point';

export interface ICol {
  id?: string;
  label?: string;
  type: ColType;
  role?: ColRole;
  p?: {
    role?: ColRole;
    [key: string]: any;
  };
}

export interface IRowC {
  v?: any;
  f?: any;
  p?: any;
}

export interface IRow {
  c: IRowC[];
}

export interface ITable {
  cols: ICol[];
  rows: IRow[];
}

interface ITextStyle {
  color?: string;
  fontName?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
}

interface IAnnoTextStyle extends ITextStyle {
  auraColor?: string;
  opacity?: number;
  strokeSize?: number;
}

interface IStem {
  color?: string;
  length?: number;
}

interface IAnnotations {
  stem?: IStem;
  style?: AnnotationStyle;
  textStyle?: IAnnoTextStyle;
  datum?: {
    style?: AnnotationStyle;
    stem?: IStem;
  };
  domain?: {
    style?: AnnotationStyle;
    stem?: IStem;
  };
  alwaysOutside?: boolean;
}

interface IChartArea {
  height: number | string;
  width: number | string;
}

interface IViewWindow {
  min?: number;
  max?: number;
}

interface IGridline {
  color?: string;
  count?: number;
  interval?: number;
  minSpacing?: number;
  multiple?: number;
  units?: any;
}

interface IAxis {
  title?: string;
  viewWindow?: IViewWindow;
  baseline?: number;
  baselineColor?: string;
  direction?: 1 | -1;
  format?: AxisFormat;
  titleTextStyle?: ITextStyle;
  viewWindowMode?: string;
  maxValue?: number;
  minValue?: number;
  gridlines?: IGridline;
  textStyle?: ITextStyle;
  textPosition?: 'in' | 'out' | 'none';
  showTextEvery?: number;
  minorGridlines?: any;
}

interface ILegend {
  alignment?: alignment;
  maxLines?: number;
  pageIndex?: number;
  position?: Position;
}

export interface IOption {
  annotations?: IAnnotations;
  height?: number | string;
  width?: number | string;
  title?: string;
  titleTextStyle?: ITextStyle;
  colors?: string[];
  hAxis?: IAxis;
  vAxes?: IAxis[];
  vAxis?: IAxis;
  chartArea?: IChartArea;
  backgroundColor?: string;
  curveType?: CurveType;
  legend?: ILegend;
  textStyle?: ITextStyle;
  series?: {
    [key: number]: {
      color?: string;
      curveType?: CurveType;
      labelInLegend?: string;
      lineDashStyle?: string;
      lineWidth?: number;
      visibleInLegend?: boolean;
      pointsVisible?: boolean;
    };
  };
  interpolateNulls?: boolean;
  pieHole?: number;
}
