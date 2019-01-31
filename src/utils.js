/**
 * Get stringified GET params from object
 *
 * @param {Object} obj - object with params
 */
export function objectToUrlParams(obj) {
  let str = '';

  for (const key in obj) {
    if (str !== '') {
      str += '&';
    }
    str += `${key}=${encodeURIComponent(obj[key])}`;
  }

  return str;
}
