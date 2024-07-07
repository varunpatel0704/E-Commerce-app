export default function errorHandler(err, req, res, next){
  // will receive error thrown from routehandlers
  const status = err.statusCode||500
  res.status(status).json({message: err.message, error:err});
}