/**
 * CONSTANTS constants
 */
export const CONSTANTS = {
  ADD_FRONT_IMAGE: 'ADD_FRONT_IMAGE',
  ADD_SIDE_IMAGE: 'ADD_SIDE_IMAGE',
  ADD_HEIGHT: 'ADD_HEIGHT',
  ADD_GENDER: 'ADD_GENDER',
  ADD_AGREE: 'ADD_AGREE',
};

/**
 * Add front image action
 *
 * @param {string} frontImage - base64 encoded front image
 */
export const addFrontImage = frontImage => ({
  type: CONSTANTS.ADD_FRONT_IMAGE,
  payload: frontImage,
});

/**
 * Add side image action
 *
 * @param {string} frontImage - base64 encoded side image
 */
export const addSideImage = sideImage => ({
  type: CONSTANTS.ADD_SIDE_IMAGE,
  payload: sideImage,
});

/**
 * Add height value action
 *
 * @param {number} height - user's height
 */
export const addHeight = height => ({
  type: CONSTANTS.ADD_HEIGHT,
  payload: height,
});

/**
 * Add gender value action
 *
 * @param {string} gender - user's gender
 */
export const addGender = gender => ({
  type: CONSTANTS.ADD_GENDER,
  payload: gender,
});

/**
 * Add agree value action
 *
 * @param {boolean} agree - user's agree value
 */
export const addAgree = agree => ({
  type: CONSTANTS.ADD_AGREE,
  payload: agree,
});

export default {
  addFrontImage,
  addSideImage,
  addHeight,
  addGender,
  addAgree,
};
