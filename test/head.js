global.assert = require('assert');

global.loadModule = function(module, entryPoint){
  entryPoint = entryPoint || 'main';
  return require(__dirname + '/../bin/modules/' + module + '/' + entryPoint);
};