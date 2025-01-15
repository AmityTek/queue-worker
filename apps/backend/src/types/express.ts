import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

/**
 * Extends the Express Request object to include a typed `body`.
 * Useful for defining the structure of request payloads.
 * @template T - The type of the body.
 */
export interface TypedRequestBody<T> extends Request {
  body: T;
}

/**
 * Extends the Express Request object to include typed `params`.
 * Useful for defining the structure of route parameters.
 * @template T - The type of the route parameters.
 */
export interface TypedRequestParams<T extends ParamsDictionary> extends Request {
  params: T;
}

/**
 * Defines the structure of the request body for the `/api/compute` POST endpoint.
 */
export interface ComputeBody {
  a: number;
  b: number;
}

/**
 * Defines the structure of the response for the `/api/compute` POST endpoint.
 */
export type ComputeResponse = { jobId: string };

/**
 * Defines the structure of the route parameters for the `/api/progress/:jobId` GET endpoint.
 */
export interface JobParams extends ParamsDictionary {
  jobId: string;
}
