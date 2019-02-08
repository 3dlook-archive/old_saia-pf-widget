/**
 * Get stringified GET params from object
 *
 * @param {Object} obj - object with params
 */
export const objectToUrlParams = (obj) => {
  let str = '';

  for (const key in obj) {
    if (str !== '') {
      str += '&';
    }
    str += `${key}=${encodeURIComponent(obj[key])}`;
  }

  return str;
};

/**
 * Send command to parent window
 *
 * @param {string} command - command name
 * @param {*} data - object with data that should be sent to parent window
 */
export const send = (command, data = {}) => {
  const origin = new URLSearchParams(window.location.search).get('origin');

  window.parent.postMessage({
    command: `saia-pf-widget.${command}`,
    data,
  }, origin);
};

/**
 * Transforms response object from size recomendation API to object like this
 * {
 *    normal: 'M',
 *    loose: 'L'
 * }
 *
 * @param {Object} recomendations - response from size recomendation API
 */
export const transformRecomendations = (recomendations) => {
  const entries = Object.entries(recomendations);
  const transformed = {};

  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    transformed[entry[0]] = entry[1].size;
  }

  return transformed;
};
