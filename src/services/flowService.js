import axios from 'axios';

/**
 * Flow API service
 */
export default class FlowService {
  flowId = null;

  state = {
    status: 'created',
  };

  constructor(key) {
    this.axios = axios.create();
    this.axios.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };
  }

  /**
   * Save flow id
   *
   * @param {string} flowId - flow id
   */
  setFlowId(flowId) {
    this.flowId = flowId;
  }

  /**
   * Create flow object
   * @async
   * @param {any} state - flow state
   */
  create(state) {
    return this.axios({
      url: `${API_HOST}/api/v2/persons/widget/`,
      method: 'POST',
      data: {
        state: {
          ...this.state,
          ...state,
        },
      },
    })
      .then((response) => {
        this.flowId = response.data.uuid;
        return this.flowId;
      });
  }

  /**
   * Get flow object details
   *
   * @param {string} flowId - flow object id
   */
  get(flowId = this.flowId) {
    return this.axios({
      url: `${API_HOST}/api/v2/persons/widget/${flowId}/`,
      method: 'GET',
    })
      .then(response => response.data);
  }

  /**
   * Patch flow object details
   *
   * @param {Object} data - data object
   * @param {string} flowId - flow object id
   */
  update(data, flowId = this.flowId) {
    return this.axios({
      url: `${API_HOST}/api/v2/persons/widget/${flowId}/`,
      method: 'PATCH',
      data,
    })
      .then(response => response.data);
  }

  /**
   * Patch flow state object details
   *
   * @param {Object} state - data object
   * @param {string} flowId - flow object id
   */
  updateState(state, flowId = this.flowId) {
    return this.axios({
      url: `${API_HOST}/api/v2/persons/widget/${flowId}/`,
      method: 'PATCH',
      data: {
        state: {
          ...this.state,
          ...state,
        },
      },
    })
      .then(response => response.data);
  }
}
