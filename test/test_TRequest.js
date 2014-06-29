/**
 * Twitter Request Test
 **/

describe("TRequest", function(){
  var TwitterRequest = loadModule('TwitterRequest'),
      treq = new TwitterRequest(apiKey);

  it("#request() - Query", function(done){
     var req = treq.request("statuses/update", {
      query: {
        status: 'Hey ! Ceci est un test unitaire de BlueBird qui sera supprimé dans 5 secondes c:'
      }
    }, function(err, res, body){
      assert.ifError(err);
      assert.equal(res.statusCode, 200);
      done();

      var tweet = JSON.parse(body);
      setTimeout(function(){
        it("#request() - Params", function(done){
          treq.request("statuses/destroy", {
            params: {
              id: tweet.id
            }
          }, function(err, res){
            assert.ifError(err);
            assert.equal(res.statusCode, 200);
            done();
          });
        });
      }, 5000);

    });
  });
});