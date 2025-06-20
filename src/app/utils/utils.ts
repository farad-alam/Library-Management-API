import { ApiResponse } from "../interfaces/book.interface";

export function successApiResponse<T>(params: ApiResponse<T>): ApiResponse<T> {
  return {
    message: params.message,
    success: params.success,
    data: params.data,
  };
}

export function errorApiResponse<T>(params: ApiResponse<T>): ApiResponse<T> {
  return {
    message: params.message,
    success: params.success,
    error: params.error,
  };
}


export function formatMongooseError(error: any) {
  if (error.name) {
    return {
      name: error.name,
      errors: error.issues,
    };
  }
  return error;
}