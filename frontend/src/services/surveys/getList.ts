import { ISurvey } from '@/models/survey';
import callApi from '../callApi';

export default async function servicesGetListSurveys(): Promise<ISurvey[]> {
  try {
    const res = await callApi('list.json');
    if (res.status === 200) {
      return res.data as ISurvey[];
    } else {
      throw res;
    }
  } catch (error) {
    throw error;
  }
}
