import isEmpty from 'lodash/isEmpty';

export default function getErrorMessage(error: any) {
  if (!error) return '';
  if (!isEmpty(error) && error.message) {
    return error.message;
  } else {
    return error;
  }
}
