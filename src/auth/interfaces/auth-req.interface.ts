import { Request } from 'express';
import { UserContext } from './';

export type AuthReq = Request & UserContext;
