/*
 * User
 */

var TwitterRequest = require('twitter-request'),
    EntityStream = global.loadModule('EntityStream');

/**
 * Consumer
 * @constructor
 * @param {Integer} userid          [User ID]
 * @param {String} consumer_key    [Consumer Key]
 * @param {String} consumer_secret [Consumer Secret Key]
 */
var Consumer = function(userid, consumer_key, consumer_secret){
  if(!(consumer_key && consumer_secret))
    throw new Error('Consumer() : No consumers keys');

  // -1 = For test
  if(!BlueBird.users[userid])
    throw new Error('Consumer() : No user with ' + userid + ' id is registered !');

  this.userid = userid;

  var oauth = {
    token: BlueBird.users[userid].token,
    token_secret: BlueBird.users[userid].token_secret,
    consumer_key: consumer_key,
    consumer_secret: consumer_secret
  };

  this._treq = new TwitterRequest(oauth);

  this.stream = null;
};


/**
 * Send a tweet
 * @method Consumer
 * @param  {Tweet}    tweet  [Tweet Object]
 * @param  {Function} cb     [Callback]
 * @return {Request}         [Request Object]
 */
Consumer.prototype.update = function(tweet, cb) {
  // if(tweet.constructor !== tweet) throw new TypeError('Consumer#update() - First argument must be an instance of Tweet or a string');

  return this._treq.request('statuses/update', {
    query: tweet.query
  }, this._callback(cb));
};


/**
 * Remove a tweet
 * @method Consumer
 * @param {Tweet} tweet
 * @param {Function} cb
 * @returns {Request}
 */
Consumer.prototype.destroyTweet = function(tweet, cb) {
  // if(tweet.constructor !== tweet) throw new TypeError('Consumer#delete() - First argument must be an instance of Tweet or a string');

  return this._treq.request('statuses/destroy', {
    params: {
      id: tweet.id_str
    }
  }, this._callback(cb));
};


/**
 * Get timeline of the current user
 * @param  {Object}   options
 * @param  {Function} cb
 * @return {Request}
 */
Consumer.prototype.getTimeline = function(options, cb) {
  options = options || {};
  if(typeof options === 'function'){
    cb = options; 
    options = {};
  }

  if(this.stream) return this.stream;

  this.stream = new EntityStream(
    this._treq.request('user', options, cb)
  );

  return this.stream;
};


/**
 * Common callback process to avoid duplication
 * @param cb {Function}
 * @returns {Function}
 * @private
 */
Consumer.prototype._callback = function(cb){
  cb = cb || function(){};
  return function(err, res, body){
    body = JSON.parse(body);

    if(err || body.errors) cb(err || body.errors);
    else cb(null, body);
  };
};


module.exports = Consumer;