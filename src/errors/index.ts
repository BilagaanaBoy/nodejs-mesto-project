import ValidationError from './validation-error';
import InternalError from './internal-error';
import { TError } from '../utils/types';

export default {
  ValidationError,
  InternalError,
  SyntaxError,
} as Record<string, TError>;
