export class ErrorResponse {
  errorCode: string;
  message: string;
  data: any;

  constructor(errorCode: string, message: string, data: any) {
    this.errorCode = errorCode;
    this.message = message;
    this.data = data;
  }
}
