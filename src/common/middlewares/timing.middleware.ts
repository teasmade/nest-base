import { Response, NextFunction } from 'express';
import { RequestWithStartTime } from '../interfaces';
// Simple functional middleware to add start time to request object
// This is then used by the response transform interceptor to calculate the request duration
export function timingMiddleware(
  req: RequestWithStartTime,
  res: Response,
  next: NextFunction,
) {
  const startTime = Date.now();
  req._startTime = startTime;
  next();
}
