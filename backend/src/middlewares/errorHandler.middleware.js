export default function errorHandler(err, req, res, next){
  // will receive error thrown from routehandlers
  res.status(err.statusCode).json({message: err.message, error:err});
}