module.exports = function(req, res, next) {
  var userId = req.param('id');
  sails.log(req.token);
  sails.log(req.access_token);
  // var currentUserId = req.token.sid;

  // if (userId != currentUserId) {
  //   return res.json(403, {err: 'You are not allowed to do that'});
  // }

  next();
};
