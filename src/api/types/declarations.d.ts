import express from 'express';

declare global {
    declare namespace Server {
        export type ResponseBody<T = any> = { data: T; error?: never } | { error: string; data?: never };

        export interface Request<Body = any, Params = any, QueryParams = any>
            extends express.Request<Params, any, any, QueryParams> {
            body: Body;
            userId?: number;
        }

        export type Response<T = any> = express.Response<ResponseBody<T>>;
    }

    declare namespace Service {
        export interface Error {
            status: number;
            error: string;
        }
    }
}
