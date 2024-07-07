export default class ApiError extends Error{
  statusCode;
  success;
  constructor(statusCode=500, message='Internal Server Error'){
    super(message);
    this.success = false;
    this.statusCode = statusCode
    this.name = this.constructor.name;
  }
}
const res = new ApiError();
console.log(res);
