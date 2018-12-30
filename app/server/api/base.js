import axios from 'axios';
import axiosRetry from 'axios-retry';

export default class Request {
  constructor() {
    const { MAX_RETRIES, TIMEOUT } = TEST_MERCADOLIBRE.API;

    const defaultConfig = {
      timeout: TIMEOUT,
      baseURL: '/',
    };

    this.requestFN = axios.create(defaultConfig);
    axiosRetry(this.requestFN, { retries: MAX_RETRIES });
  }

  get = (...args) => Promise.resolve(this.requestFN.get(...args));

  post = (...args) => Promise.resolve(this.requestFN.post(...args));
}
