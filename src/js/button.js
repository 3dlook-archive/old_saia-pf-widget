require('../scss/button.scss');
const buttonTemplate = require('../views/button.html');
const modalTemplate = require('../views/modal-drop.html');

class SaiaButton {
  /**
   * SaiaButton constructor
   *
   * @param {Object} options - parameters
   * @param {string} options.container - selector for button container
   * @param {string} options.key - SAIA PF API key
   * @param {string} options.widgetUrl - url to the widget host to open it in the iframe
   * @param {Object} [options.product] - object with product parameters (optional)
   * @param {string} [options.product.description] - product description.
   * Will be displayed on final results page
   * @param {string} [options.product.imageUrl] - url to product image
   * Will be displayed on final results page
   * @param {string} [options.product.url] - url to product. For shopify usage only.
   * Instead use brand and bodyPart options to determine right sizecharts
   * @param {string} [options.brand] - brand name. If brand and bodyPart are set,
   * then product.url is ignored
   * @param {string} [options.bodyPart] - body part name. If brand and bodyPart are set,
   * then product.url is ignored
   */
  constructor(options) {
    this.defaults = {
      container: '.saia-widget-container',
      key: '',
      widgetUrl: '',
      brand: '',
      bodyPart: '',

      ...options,

      product: {
        description: '',
        imageUrl: '',
        url: window.location.href,

        ...options.product,
      },
    };

    if (!this.defaults.container) {
      throw new Error('Please provide a container CSS selector');
    }

    if (!this.defaults.key) {
      throw new Error('Please provide API key');
    }

    if (!this.defaults.widgetUrl) {
      throw new Error('Please provide a widget url');
    }
  }

  /**
   * Init widget
   */
  init() {
    const container = document.querySelector(this.defaults.container);
    container.insertAdjacentHTML('beforeend', buttonTemplate);

    // append modal drop to body
    document.body.insertAdjacentHTML('beforeend', modalTemplate);

    // get modal and button elements by their selectors
    const modal = document.querySelector('.saia-pf-drop');
    const btn = document.querySelector('.saia-pf-button');

    btn.addEventListener('click', () => {
      modal.classList.toggle('active');

      let url = `${this.defaults.widgetUrl}?key=${this.defaults.key}&origin=${window.location.origin}`;

      if (this.defaults.product.url) {
        url += `&product=${this.defaults.product.url}`;
      }

      if (this.defaults.product.description) {
        url += `&product_description=${this.defaults.product.description}`;
      }

      if (this.defaults.product.imageUrl) {
        url += `&image=${this.defaults.product.imageUrl}`;
      }

      if (this.defaults.brand && this.defaults.bodyPart) {
        url += `&brand=${this.defaults.brand}`;
        url += `&body_part=${this.defaults.bodyPart}`;
      }

      modal.querySelector('iframe').setAttribute('src', url);
    });

    window.addEventListener('message', (event) => {
      const { command, data } = event.data;

      switch (command) {
        case 'saia-pf-widget.close':
          modal.classList.toggle('active');
          break;
        case 'saia-pf-widget.data':
          localStorage.setItem('saia-pf-widget-data', JSON.stringify(data));
          break;
        case 'saia-pf-widget.recommendations':
          btn.innerHTML = `Your size is: ${data.normal}`;
          break;

        default:
          break;
      }
    }, false);
  }
}

export default SaiaButton;
