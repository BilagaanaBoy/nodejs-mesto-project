import { Joi } from 'celebrate';
import isURL from 'validator/lib/isURL';

import { ALLOWED_SYMBOLS_IN_LINK } from './constants';

// prettier-ignore
const linkReg = new RegExp(String.raw`https?:\/\/(www\.)?[-a-zA-Z0-9${ALLOWED_SYMBOLS_IN_LINK}]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9${ALLOWED_SYMBOLS_IN_LINK}]*)`);

const onNormalizeUrl = (url: string) => {
  try {
    return url.replace(/https?:\/\/www\./, `${url.match(/https?/)?.[0]}://`);
  } catch (e) {
    return '';
  }
};

const onCheckUrlByReg = (link: string) => linkReg.test(onNormalizeUrl(link));

export default function validation(
  message: string,
  typeValidation: 'url',
) {
  return (value: string, helpers: Joi.CustomHelpers) => {
    // prettier-ignore
    switch (typeValidation) {
      case 'url': if (isURL(onNormalizeUrl(value)) && onCheckUrlByReg(value)) return value; break;
      default: break;
    }
    return helpers.message({ custom: message });
  };
}
