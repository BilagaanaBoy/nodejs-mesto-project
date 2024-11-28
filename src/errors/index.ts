import NotFoundError from './not-found-error';
import ValidationError from './validation-error';
import ForbiddenError from './forbidden-error';
import InternalError from './internal-error';
import UnauthorizedError from './unauthorized-error';
import ConflictError from './conflict-error';
import { TError } from '../utils/types';

export default {
  NotFoundError,
  ValidationError,
  ForbiddenError,
  InternalError,
  SyntaxError,
  UnauthorizedError,
  ConflictError,
} as Record<string, TError>;
