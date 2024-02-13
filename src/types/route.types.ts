import { NextFunction, Request, Response } from "express";

export type Route = (
  Request: Request,
  Response: Response,
  NextFunction: NextFunction
) => Promise<any>;
