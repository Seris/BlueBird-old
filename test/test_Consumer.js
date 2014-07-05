/**
 * Twitter Request Test
 **/

describe("Consumer", function(){
  var Consumer = loadModule('Consumer');

  var TestUser = new Consumer(0, "CONSUMER_KEY", "CONSUMER_SECRET");
  TestUser._treq.oauth = apiKey;

  it("#update()/destroyTweet()", function(done){
    TestUser.update({query: {status: 'Unit Test of Bluebird, this tweet will be deleted now ;3'}}, function(err, tweet){
      assert.ifError(err, err);
      console.log(("✓ update()").green);
      TestUser.destroyTweet(tweet, function(err){
        assert.ifError(err, err);
        console.log(("✓ destroyTweet()").green);
        done();
      });
    });
  });
});