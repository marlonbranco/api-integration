import ErrorsApp from '@errors/ErrorsApp';
import { Request, Response, NextFunction } from 'express';

const errorHandling = ((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof ErrorsApp) {
    return response
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

export default errorHandling;
