/*
 * Twitter Request
 * Make request to the Twitter API
 */

var util = require('util'),
    request = require('request'),
    qs = require('querystring');

/**
 * Make request to the Twitter API
 * @param options
 * @param onReady
 * @constructor
 */
var TRequest = module.exports = function(options, onReady){
  if(!(options.consumer_key && options.consumer_secret)){
    throw new Error('TRequest need a public and secret consumer key');
  }

  if(onReady) this.on('ready', onReady);

  this.oauth = {
    consumer_key: options.consumer_key,
    consumer_secret: options.consumer_secret,

    token: options.token,
    token_secret: options.token_secret
  };

  this.emit('ready');
};

// Add event to TRequest
util.inherits(TRequest, require('events').EventEmitter);

// Save Endpoints
var endpoints = TRequest.endpoints = require(__dirname + '/endpoints');

/**
 * POST Request to Twitter API
 * @param url
 * @param body
 * @param cb
 */
TRequest.prototype.post = function(url, body, cb){
  cb = cb || function(){};

  return request.post(url, {body: body, oauth: this.oauth}, function(err, res, body){
    if(err) return cb(err);

    cb(null, res, body);
  });
};

/**
 * GET Request to Twitter API
 * @param url
 * @param cb
 * @returns {*}
 */
TRequest.prototype.get = function(url, cb){
  cb = cb || function(){};

  return request.get(url, {oauth: this.oauth}, function(err, res, body){
    if(err) return cb(err);

    cb(null, res, body);
  });
};

/**
 * Make a request to the Twitter API
 * @param endpoint
 * @param options
 * @param cb
 * @returns {*}
 */
TRequest.prototype.request = function(endpoint, options, cb){
  if(!TRequest.endpoints[endpoint]) throw new Error('Endpoint ' + endpoint + ' not found !');

  options = options || {};
  options.body = options.body || {};
  endpoint = TRequest.endpoints[endpoint];

  if(typeof options === 'function') cb = options;

  // Adding the query to the url
  var url = endpoint.url;
  url += (options.query ? ('?' + qs.stringify(options.query)) : '');

  if(options.params){
    for(var param in options.params){
      if(options.params.hasOwnProperty(param)) url = url.replace(':' + param, options.params[param]);
    }
  }

  switch(endpoint.method){
    case 'get':
      return this.get(url, cb);
      break;

    case 'post':
      return this.post(url, qs.stringify(options.body), cb);
      break;
  }

  throw new Error('Endpoint ' + endpoint + ' has no valid HTTP Method !');
};