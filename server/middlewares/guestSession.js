module.exports = (req, res, next) => {
  if (!req.user) {
    req.user = {
      name: "guest",
      displayName: "guest",
      user_id: 0
    };
  }
  next();
};
