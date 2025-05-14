import { Request } from 'express';

export interface RequestWithStartTime extends Request {
  _startTime: number;
}
