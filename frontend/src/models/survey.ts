export interface ISurvey {
  name: string;
  code: string;
}

export type SurveyType = 'qcm' | 'date' | 'numeric';

export interface IQCM {
  [key: string]: number;
}

export interface ISurveyItem {
  result: number | IQCM | string[];
  type: SurveyType;
  label: string;
}
