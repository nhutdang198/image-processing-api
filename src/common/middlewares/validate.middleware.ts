import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

type ClassType<T> = { new (...args: unknown[]): T };

const validateQuery = <T extends object>(targetClass: ClassType<T>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const query = plainToInstance(targetClass, request.query);
    const errors = await validate(query);
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }
    request.query = query as never;
    next();
  };
};

export default validateQuery;
