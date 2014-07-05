require('colors');

// Load API Key for test
if(!require('fs').existsSync(__dirname + '/apiKey.js')){
  console.error(("No apiKey.js detected !").red);
  process.exit(0);
}
require(__dirname + '/apiKey.js');

global.BlueBird = {
  users: {
    0: {
      token: apiKey.token,
      token_secret: apiKey.token_secret
    }
  },

  keys: {
    consumer_key: apiKey.consumer_key,
    consumer_secret: apiKey.consumer_secret
  }
};

global.assert = require('assert');

global.loadModule = function(module, entryPoint){
  entryPoint = entryPoint || 'main';
  return require(__dirname + '/../bin/modules/' + module + '/' + entryPoint);
};