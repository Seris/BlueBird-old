/**
 * A Tweet Stream
 */

var TweetStream = function(req){
  this._req = _req;

  req.once('data', function(data){
    console.log(data.toString());
  });
};

// Add event
require('util').inherits(TweetStream, require('events').EventEmitter);

TweetStream.prototype.close = function() {
  this._req.end();
}; 