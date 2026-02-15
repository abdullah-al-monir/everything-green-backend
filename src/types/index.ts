import { Request } from 'express';

export interface IUser {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  password: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface JwtPayload {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: any;
  token?: string;
  code?: string;
}