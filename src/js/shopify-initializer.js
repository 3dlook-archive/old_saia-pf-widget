import SaiaButton from './button';

/**
 * Get your fit button
 *
 * 1. check if we should display button
 * 2. check if we have a place to display widget button
 * 3. check if we already have presaved data in localstorage.
 *   if so, get recomended size from api
 * 4. display button
 */
const button = new SaiaButton({
  container: '.product-single__meta',
  key: API_KEY,
  widgetUrl: WIDGET_HOST,
  brand: '123123123',
  bodyPart: 'top',
  product: {
    imageUrl: 'https://gamemag.ru/images/views/no_avatar.jpg',
    description: 'The Nike Air Rally Women\'s Crew',
  },
});
button.init();

console.log(API_KEY);
console.log(API_HOST);
console.log(WIDGET_HOST);
