import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { Types, model, Schema } from 'mongoose';

export type TParams = Partial<{ userId: string; cardId: string }>;

export type TSessionRequest = { user: { _id: string } };

export type TController<TBody = any> = Record<
  string,
  (
    req: Request<TParams, {}, TBody> & Partial<TSessionRequest>,
    res: Response,
    next: NextFunction,
  ) => Promise<any> | any
>;

export type TControllerParameters<T extends Record<string, any> = any> =
  Parameters<TController<T>[string]>;

export type TDecoratorMethod = (
  target: Function,
  name: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor;

// eslint-disable-next-line no-shadow
export enum HTTP_CODES {
  OK_200 = 200,
  CREATED_201 = 201,
  BAD_REQUEST_400 = 400,
  UNAUTHORIZED_401 = 401,
  FORBIDDEN_403 = 403,
  NOT_FOUND_404 = 404,
  CONFLICT_409 = 409,
  INTERNAL_SERVER_ERROR_500 = 500,
}

export interface IError extends Error {
  statusCode: HTTP_CODES;
}

export type TError = new <T extends IError>(message?: string) => T;

export type TErrorHandler = <E extends InstanceType<TError>>(
  err: E & Request,
  ...args: TControllerParameters<{}>
) => any;

export interface IUser {
  _id: string;
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: ICard['owner'][];
  createdAt: Date;
}

export type TModelSettings<T = any, M = any> = {
  nameModel: string;
  validationSchema: Record<string, Joi.PartialSchemaMap<T>>;
  schema: Schema<T, M>;
  get model(): ReturnType<typeof model>;
};

export type TUserCtrlParams = TControllerParameters<IUser>;

export type TCardCtrlParams = TControllerParameters<ICard>;
