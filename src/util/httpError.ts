import { NextFunction, Request } from 'express';
import errorObject from './errorObject';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (nextFuc: NextFunction, error: Error | unknown, req: Request, errorStatusode: number = 500): void => {
    const errorObj = errorObject(error, req, errorStatusode)
    return nextFuc(errorObj);
}