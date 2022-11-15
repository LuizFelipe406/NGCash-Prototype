export default class CustomError extends Error {
    status: number;
    
    constructor(message: string, status:number) {
      super(message);
      this.status = status;
    }
  }
  
  export type CustomErrorParams = {
    message: string;
    status: number;
  }