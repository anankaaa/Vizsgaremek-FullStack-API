module.exports = (req, res, next) => {
  const user = req.user;

  if (!user || user.role !== 1) {
    return res.sendStatus(403);
  }
  next();
};
