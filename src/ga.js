export const gaWelcomeOnContinue = () => ga('send', {
  hitType: 'event',
  eventCategory: 'start',
  eventAction: 'continue',
});

export const gaTipsOnContinue = () => ga('send', {
  hitType: 'event',
  eventCategory: 'tips',
  eventAction: 'continue',
});

export const gaDataMale = () => ga('send', {
  hitType: 'event',
  eventCategory: 'gender',
  eventAction: 'select',
  eventLabel: 'male',
});

export const gaDataFemale = () => ga('send', {
  hitType: 'event',
  eventCategory: 'gender',
  eventAction: 'select',
  eventLabel: 'female',
});

export const gaDataOnContinue = () => ga('send', {
  hitType: 'event',
  eventCategory: 'gender',
  eventAction: 'continue',
});

export const gaUploadOnContinue = () => ga('send', {
  hitType: 'event',
  eventCategory: 'photos',
  eventAction: 'continue',
});

export const gaResultsOnContinue = () => ga('send', {
  hitType: 'event',
  eventCategory: 'backtostore',
  eventAction: 'continue',
});

export const gaHelpOnClick = () => ga('send', {
  hitType: 'event',
  eventCategory: 'help',
  eventAction: 'view',
});

export const gaCloseOnClick = () => ga('send', {
  hitType: 'event',
  eventCategory: 'widget',
  eventAction: 'close',
});

export const gaSizeNotFound = () => ga('send', {
  hitType: 'event',
  eventCategory: 'size_error',
});
