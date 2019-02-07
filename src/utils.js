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
