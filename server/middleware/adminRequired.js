module.exports = (req, res, next) => {
  if (res.locals.user) {
    if (res.locals.user.role === 'Admin') {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
