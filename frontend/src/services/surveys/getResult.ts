import { ISurveyItem } from '@/models/survey';
import callApi from '../callApi';

export default async function servicesGetSurveyResult(code: string): Promise<ISurveyItem[]> {
  const res = await callApi(`${code}.json`);
  if (res.status === 200) {
    return res.data;
  } else throw res;
}
