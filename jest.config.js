module.exports = {
  setupFiles: [
    './test/setup.js',
  ],
  verbose: true,
  moduleNameMapper: {
    '\\.(pdf|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less|scss)$': '<rootDir>/test/empty-module.js',
  },
};
