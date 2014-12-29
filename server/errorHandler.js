// Error handlers ensures any errors are logged on the server 
// and the error message is sent back to the client
module.exports = {
  errorHandler: function(error, req, res, next) {
    console.log('Server error encountered', error.message);
    res.send(500, {error: error.message});
  }
};