var request = require('request'),
    qs = require('querystring');

module.exports = function (cb) {
  request.post({ url: "https://api.twitter.com/oauth/request_token", oauth: {
    consumer_key: BlueBird.keys.consumer_key,
    consumer_secret: BlueBird.keys.consumer_secret
  }}, function (err, res, body) {
    if (err) {
      cb(err);
      return;
    }

    if (res.statusCode === 200) {
      cb(null, qs.decode(body));
    } else {
      cb(null, false);
    }
  });
};
