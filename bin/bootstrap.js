/**
 * Bootstrap script of BlueBird
 */

/* Load path */
global.__root = require('path').resolve(__dirname + '/..');
    global.__bin = __root + '/bin';
        global.__modules = __bin + '/modules';
    global.__etc = __root + '/etc';
    global.__webview = __root + '/webview';
        global.__css = __webview + '/css';
        global.__img = __webview + '/img';
        global.__resources = __webview + '/resources';


global.BlueBird = window.BlueBird = {};

/* Load options */
BlueBird.options = require(__etc + '/options.json');
BlueBird.keys = require(__etc + '/keys.json');
BlueBird.users = require(__etc  + '/users.json');

/* Load Gui Interface */
global.nwGui = window.nwDispatcher.requireNwGui();
global.nwApp = nwGui.Window.get();

/**
 * Load module
 * @param module
 * @param entryPoint
 * @returns {*}
 */
global.loadModule = function(module, entryPoint){
  entryPoint = entryPoint || 'main';
  return require(__bin + '/modules/' + module + '/' + entryPoint);
};

/* Developer Mode */
if(BlueBird.options.developerMode) loadModule('DeveloperMode');

