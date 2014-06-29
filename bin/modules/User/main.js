/*
 * User
 */

var TwitterRequest = loadModule('TwitterRequest');

module.exports = function(userid, consumersKey){
  if(!BlueBird.users[userid]) throw new Error('No user with ' + userid + ' id is registered !');

  if(consumersKey.key && consumersKey.secret)
};