import express from 'express';

declare global {
    namespace Server {
        export type ResponseBody<T = any> = { data: T; error?: never } | { error: string; data?: never };

        export interface Request<Body = any, Params = any, QueryParams = any>
            extends express.Request<Params, any, any, QueryParams> {
            body: Body;
            userId?: string;
        }

        export type Response<T = any> = express.Response<ResponseBody<T>>;
    }

    namespace Service {
        export interface Error {
            status: number;
            error: string;
        }
    }
}
