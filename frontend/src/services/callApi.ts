import serializeQuery from '@/utils/serializeQuery';
import { hostApi } from '@/variables/index';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import isEmpty from 'lodash/isEmpty';

export interface IOptions extends AxiosRequestConfig {
  query?: any;
}

export default async function callApi(
  endpoint: string,
  options: IOptions = {}
): Promise<AxiosResponse> {
  //#region Preparing request Headers
  const defaultHeader = {};
  const { headers, ...otherOptions } = options;
  if (!isEmpty(options.query)) {
    const queryString = serializeQuery(options.query);
    if (endpoint.includes('?')) {
      endpoint = `${endpoint}&${queryString}`;
    } else {
      endpoint = `${endpoint}?${queryString}`;
    }
  }
  Object.assign(defaultHeader, headers);
  const res = await axios({
    url: `${hostApi}${endpoint}`,
    headers: defaultHeader,
    timeout: 30000,
    timeoutErrorMessage: '[Error] request timeout',
    ...otherOptions
  });
  return res;
}
