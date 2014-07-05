/**
 * A Tweet Stream
 */

var EntityStream = function(req){
  var self = this;
  this._req = req;

  if(!req.response){
    req.on('response', function(){
      self._res = req.response;
      self.emit('_response', self._res);
    });
  } else {
    this._res = req.response;
    this.emit('_response', this._res);
  }

  var buffer = this._buffer = "";
  req.on('data', function(data){
    buffer += data.toString();
    data = self._parseStream(buffer);
    buffer = data.buffer;

    for(var i = 0; i < data.entities.length; i++){
      self._handleEntity(data.entities[i]);
    }
  });
};

// Add event
require('util').inherits(EntityStream, require('events').EventEmitter);


/**
 * Add an entity to the stream
 * @param entity
 * @returns {*}
 * @private
 */
EntityStream.prototype._handleEntity = function(entity) {
  if(entity.user){
    this.emit('user');
  }

  if(entity.friends){
    this.emit('entity', 'friends', entity);
    return this.emit('friends', entity);
  }

  if(entity.retweeted_status){
    this.emit('entity', 'retweet', entity);
    return this.emit('retweet', entity);
  }

  if(entity.text){
    this.emit('entity', 'tweet', entity);
    return this.emit('tweet', entity);
  }

  if(entity.event === 'favorite'){
    this.emit('entity', 'favorite', entity);
    return this.emit('favorite', entity);
  }

  if(entity.delete){
    this.emit('entity', 'delete-tweet', entity);
    return this.emit('delete-tweet', entity.delete.status);
  }

  this.emit('unknown-entity', entity);
  this.emit('entity', 'unknown', entity);
};


/**
 * Parse a data stream
 * @param buffer
 * @private
 */
EntityStream.prototype._parseStream = function(buffer){
  buffer = buffer.split('\n\r');
  var entities = [];

  for(var i = 0; i < buffer.length; i++){
    if(!buffer[i]){
      buffer.shift();
      i--;
      continue;
    }

    try {
      entities.push(JSON.parse(buffer[i]));
      buffer.shift();
    } catch(e){}
  }

  return {
    buffer: buffer.join(''),
    entities: entities
  };
};


module.exports = EntityStream;