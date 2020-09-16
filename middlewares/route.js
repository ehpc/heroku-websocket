export default (req, res, next) => {
  const pathVariable = req.path
    .split('/')
    .slice(1)
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join('');
  res.locals[`is${pathVariable}Page`] = true;
  next();
};
