import { CONSTANTS } from './actions';

export const INITIAL_STATE = {
  gender: null,
  height: null,
  frontImage: null,
  sideImage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_FRONT_IMAGE:
      return {
        ...state,
        frontImage: action.payload,
      };

    case CONSTANTS.ADD_SIDE_IMAGE:
      return {
        ...state,
        sideImage: action.payload,
      };

    case CONSTANTS.ADD_GENDER:
      return {
        ...state,
        gender: action.payload,
      };

    case CONSTANTS.ADD_HEIGHT:
      return {
        ...state,
        height: action.payload,
      };

    case CONSTANTS.ADD_AGREE:
      return {
        ...state,
        agree: action.payload,
      };

    default:
      return state;
  }
};
