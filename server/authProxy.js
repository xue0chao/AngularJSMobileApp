// proxy for authenticating users
// this was done because the client cannot access the third party service 
// without encountering cross-domain errors, since the third party service's
// http responses did not include a Access-Control-Allow-Origin = '*' in their
// headers; since the request uses the POST method AND we cannot modify code
// on the third party site, we cannot use JSONP or CORS and therefore can only 
// use a proxy

var http = require('http');

module.exports = {

  verifyUser: function (req, res, next) {

    var url = req.body.authServer;
    var user = req.body.user;
    var responseData = '';

    var request = http.request({
      host: 't001-005-001-02a.elasticbeanstalk.com',
      path: '/api',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, function (response) {
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        responseData += chunk;
      });
      response.on('end', function () {
        res.json(JSON.parse(responseData));
      });
    });

    request.on('error', function (err) {
      next(err);
    });
    
    request.write(JSON.stringify(user));
    request.end();

  }

};