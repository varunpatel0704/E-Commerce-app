export default function asyncHandler(requestHandler){
  return (
    async function(req, res, next){ //just a trycatch wrapper over the original request handler.
      try {
        await requestHandler(req, res, next);
      } catch (error) {
        next(error); // will be handled by error handling middleware.
      }
    }
  );
}