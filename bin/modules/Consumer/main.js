/*
 * User
 */

var TwitterRequest = require('twitter-request');

/**
 * Consumer Constructor
 * @constructor
 * @param {[type]} userid          [User ID]
 * @param {[type]} consumer_key    [Consumer Key]
 * @param {[type]} consumer_secret [Consumer Secret Key]
 */
var Consumer = function(userid, consumer_key, consumer_secret){
  if(!(consumer_key && consumer_secret))
    throw new Error('Consumer() : No consumers keys');

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
};

/**
 * Send an update (tweet)
 * @method Consumer
 * @param  {Tweet}    tweet  [Tweet Object]
 * @param  {Function} cb     [Callback]
 * @return {Request}         [Request Object]
 */
Consumer.prototype.update = function(tweet, cb) {
  if(tweet.constructor !== tweet) throw new TypeError('Consumer#update() - First argument must be an instance of Tweet or a string');

  return this._treq.request('statuses/update', {
    query: tweet.query
  }, cb);
};

/**
 * Get timeline of the current user
 * @param  {Object}   options
 * @param  {Function} cb
 * @return {Request}
 */
Consumer.prototype.getTimeline = function(options, cb) {
  if(typeof options === 'function'){
    cb = options; 
    options = {};
  }


}; 

module.exports = Consumer;