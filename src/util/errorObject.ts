import { Request } from 'express';
import { THttpError } from '../types/types';
import responseMessage from '../constant/responseMessage';
import { EApplicationEnvironment } from '../constant/aplication';
import config from '../config/config';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (error: Error | unknown, req: Request, errorStatusode: number = 500): THttpError => {
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStatusode,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
        },
        message: error instanceof Error ? error.message || responseMessage.SOMTHING_WENT_WRONG : responseMessage.SOMTHING_WENT_WRONG,
        data: null,
        trace: error instanceof Error ? {error: error.stack} : null,
    }

    //log Response
    console.error(`CONTROLLER_ERROR`, {
        meta: errorObj
    });
    
    //Production env check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip;
        delete errorObj.trace;

    }


    return errorObj;
} 
