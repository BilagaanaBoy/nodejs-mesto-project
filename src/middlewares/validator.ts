import { Joi, Segments, celebrate } from 'celebrate';
import { TModelSettings } from '../utils/types';
import { ERROR_MESSAGES } from '../utils/constants';

export default function validator(
  segment: Segments,
  schema: TModelSettings['validationSchema'][string],
) {
  return celebrate(
    {
      [segment]: Joi.object().keys(schema),
    },
    {
      messages: {
        'string.empty': ERROR_MESSAGES.GENERAL.VALIDATION.EMPTY,
        'any.required': ERROR_MESSAGES.GENERAL.VALIDATION.EMPTY,
        'object.unknown': ERROR_MESSAGES.GENERAL.VALIDATION.UNKNOWN,
      },
    },
  );
}
