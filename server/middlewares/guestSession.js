module.exports = (req, res, next) => {
  if (!req.user) {
    req.user = {
      name: "guest",
      displayName: "guest",
      id: 0
    };
  }
  next();
};
