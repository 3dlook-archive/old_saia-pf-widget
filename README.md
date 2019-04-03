# SAIA Perfect Fit Widget

Widget, that implements getting garment size for user based on SAIA Perfect Fit API.

## How to run

**1. Install all dependencies with the following command:**

```sh
npm install
```

**2. To run the project in development mode, type in a terminal the following command:**

```sh
npm start
```

**3. To build the widget for production use this command:**

```sh
npm run build:prod
```

Build for Shopify (for internal usage only):

```sh
npm run build:shopify
```

## Build configuration file

Configuration file should be named like this:

    saia-config.<config type>.js

File should export an object, which contains the following:

```js
module.exports = {
  // saia api host url
  API_HOST: '',
  // client api key
  API_KEY: '',
  // shopify host url
  SHOPIFY_HOST: '',
  // widget host url
  WIDGET_HOST: '',
};
```


## Deployment requirements

To properly host widget for your website, you need to host index.html file of subdomain, for example, https://widget.example.com, and then call it from your website. This is required for widget navigation to work.


## Example of usage

Let's configure widget for your store, that is located on this domain https://test-store.com/. Before building the widget, we already prepared a subdomain for it, let's call it https://pf-widget.test-store.com/. Now you should clone this repository on your computer. After that enter the widget directory and run the following command:

```sh
npm install
```

Then create a configuration file for your shop with name like this:

```
saia-config.test-store.js
```

Enter required information to this file:

```js
// saia-config.test-store.js
module.exports = {
  // saia api host url
  API_HOST: 'https://saia.3dlook.me',
  // client api key
  API_KEY: 'h2f98h13fh934hv91b3h51345b245yqeg255y',
  // shopify host url
  SHOPIFY_HOST: '', // ignore this field
  // widget host url
  WIDGET_HOST: 'https://pf-widget.test-store.com',
};
```

After that, run in the terminal the following command:

```sh
export NODE_ENV=production && export CONFIG=sport-clothing-store && webpack --progress
```

You will get dist folder, that has this structure:

```
dist/
--widget-assets/
....*image assets*
--index.html
--saia-pf-button.js
..ignore other files
```

On domain https://pf-widget.test-store.com/ you should host widget-assets folder and index.html file - widget files. saia-pf-button.js should be included on the pages, on which you want to display a button and widget modal. This file could be included with this code:

```html
<script src="saia-pf-button.js"></script>
```

After this tag you can initialize the button. Example code:

```js
(async () => {
  const button = new SaiaButton({
    // widget container element selector
    container: '.product-single__meta',
    // your SAIA API key
    key: 'fnqiwhf9v9y9ty13bt783yugyiurygb3v78gvt',
    // widget domain
    widgetUrl: 'https://pf-widget.test-store.com/',
    // brand name
    brand: 'Nike',
    // body part
    bodyPart: 'top',
    // product information
    product: {
      // product image url for results page
      imageUrl: 'https://imagehost.com/images/products/product.jpg',
      // product description for results page
      description: 'The Nike Air Rally Women\'s Crew',
    },
  });

  // init button
  button.init();

  // try to get size recomendation for user,
  // that already has passed the widget flow
  // and has its measurements in localStorage
  const recomendations = await button.getSize();

  // display size recomendations
  if (recomendations) {
    button.displaySize(recomendations);
  }
})();

```

After that you will get "Your perfect fit" button on the page.

<a name="SaiaButton"></a>

## SaiaButton
**Kind**: global class  

* [SaiaButton](#SaiaButton)
    * [new SaiaButton(options)](#new_SaiaButton_new)
    * [.init()](#SaiaButton+init)
    * [.checkButtonVisibility()](#SaiaButton+checkButtonVisibility)
    * [.getSize()](#SaiaButton+getSize) ⇒ <code>Object</code> \| <code>null</code>
    * [.displaySize(recomendations)](#SaiaButton+displaySize)

<a name="new_SaiaButton_new"></a>

### new SaiaButton(options)
SaiaButton constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | parameters |
| options.container | <code>string</code> | selector for button container |
| options.key | <code>string</code> | SAIA PF API key |
| options.widgetUrl | <code>string</code> | url to the widget host to open it in the iframe |
| [options.buttonStyle] | <code>string</code> | button style. Could be 'gradient', 'gradient-reversed', 'black', 'white' |
| [options.product] | <code>Object</code> | object with product parameters (optional) |
| [options.product.description] | <code>string</code> | product description. Will be displayed on final results page |
| [options.product.imageUrl] | <code>string</code> | url to product image Will be displayed on final results page |
| [options.product.url] | <code>string</code> | url to product. For shopify usage only. Instead use brand and bodyPart options to determine right sizecharts |
| [options.brand] | <code>string</code> | brand name. If brand and bodyPart are set, then product.url is ignored |
| [options.bodyPart] | <code>string</code> | body part name. If brand and bodyPart are set, then product.url is ignored |
| [options.id] | <code>number</code> \| <code>string</code> | unique id of the button |

<a name="SaiaButton+init"></a>

### saiaButton.init()
Init widget

**Kind**: instance method of [<code>SaiaButton</code>](#SaiaButton)  
<a name="SaiaButton+checkButtonVisibility"></a>

### saiaButton.checkButtonVisibility()
Check should we display button for current product page or not

**Kind**: instance method of [<code>SaiaButton</code>](#SaiaButton)  
<a name="SaiaButton+getSize"></a>

### saiaButton.getSize() ⇒ <code>Object</code> \| <code>null</code>
Get size for current product if measurements presaved in localstorage

**Kind**: instance method of [<code>SaiaButton</code>](#SaiaButton)  
**Returns**: <code>Object</code> \| <code>null</code> - recomendations  
<a name="SaiaButton+displaySize"></a>

### saiaButton.displaySize(recomendations)
Display sizes on the button

**Kind**: instance method of [<code>SaiaButton</code>](#SaiaButton)  

| Param | Type | Description |
| --- | --- | --- |
| recomendations | <code>Object</code> | size recomendations transformed object |


# TODO:

* Split SCSS styles to components style files
