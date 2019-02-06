# SAIA Perfect Fit Widget

Widget, which implements getting garment size for user based on SAIA PF API.

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

Build for shopify:

```sh
npm run build:shopify
```

## Build configuration file

Config file should be named like this:

    saia-config.<config type>.js

File should export an object, which contains the folliwing fields:

```js
{
  API_HOST: '<url to api>',
  API_KEY: '<api key>'
}
```

# TODO:

* Split SCSS styles to components style files
