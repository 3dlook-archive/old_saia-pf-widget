import { CONSTANTS } from './actions';

export const INITIAL_STATE = {
  token: null,

  gender: null,
  height: null,

  frontImage: null,
  sideImage: null,

  flowId: null,

  brand: null,
  bodyPart: null,
  productUrl: null,

  recommendations: {
    tight: null,
    normal: null,
    loose: null,
  },

  softValidation: {
    front: {
      bodyAreaPercentage: null,
      legsDistance: null,
      messages: [],
    },
    side: {
      bodyAreaPercentage: null,
      messages: [],
    },
  },

  hardValidation: {
    front: null,
    side: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

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

    case CONSTANTS.SET_FLOW_ID:
      return {
        ...state,
        flowId: action.payload,
      };

    case CONSTANTS.SET_BODY_PART:
      return {
        ...state,
        bodyPart: action.payload,
      };

    case CONSTANTS.SET_BRAND:
      return {
        ...state,
        brand: action.payload,
      };

    case CONSTANTS.SET_PRODUCT_URL:
      return {
        ...state,
        productUrl: action.payload,
      };

    case CONSTANTS.SET_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          ...action.payload,
        },
      };

    case CONSTANTS.SET_SOFT_VALIDATION:
      return {
        ...state,
        softValidation: {
          ...state.softValidation,
          ...action.payload,
        },
      };

    case CONSTANTS.SET_HARD_VALIDATION:
      return {
        ...state,
        hardValidation: {
          ...state.hardValidation,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
