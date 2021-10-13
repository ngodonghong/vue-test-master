export default function serializeQuery(obj: any): string {
  if (typeof obj === 'string') return obj;
  const str: string[] = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      if (typeof obj[p] === 'string') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      } else {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(JSON.stringify(obj[p])));
      }
    }
  }
  return str.join('&');
}
