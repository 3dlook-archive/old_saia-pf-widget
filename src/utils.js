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
export const send = (command, data = {}, origin) => {
  const finalOrigin = origin || new URLSearchParams(window.location.search).get('origin');

  window.parent.postMessage({
    command: `saia-pf-widget.${command}`,
    data,
  }, finalOrigin);
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

/**
 * Convert centimeters value to feets and inches
 *
 * @param {number} cm - centimeters
 * @returns {Object} object with feets and inches values
 */
export const cmToFtIn = (cm) => {
  const inches = cm / 2.54;
  const ft = inches / 12;

  return {
    ft: Math.floor(ft),
    in: Math.ceil(inches.toFixed(0) % 12),
  };
};

/**
 * Convert inches to centimeters
 *
 * @param {number} inches - inches
 * @returns {number} centimeters value
 */
export const in2cm = inches => inches * 2.54;

/**
 * Convert ft to in value
 *
 * @param {number} ft - feets value
 * @returns {number} inches value
 */
export const ft2in = ft => ft * 12;

/**
 * Convert ft and in height to cm value
 *
 * @param {number} ft - feets value
 * @param {number} inches - inches value
 */
export const getHeightCm = (ft = 0, inches = 0) => {
  return in2cm(ft2in(ft) + parseInt(inches, 10));
};
