export default class ApiResponse{
  statusCode;
  message;
  data;
  success;
  constructor(statusCode=200, message='request successful', data=null){
    this.statusCode=statusCode;
    this.message=message;
    this.data=data;
    this.success = 200 <= statusCode && statusCode <=400;
  }
}
// const res = new ApiResponse();
// console.log(res);