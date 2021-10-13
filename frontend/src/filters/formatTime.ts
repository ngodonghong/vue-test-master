import dayjs from 'dayjs';

function formatTime(value: string, format = 'DD/MM/YYYY HH:mm') {
  if (!value) return null;
  else {
    return dayjs(value).format(format);
  }
}
export default formatTime;
