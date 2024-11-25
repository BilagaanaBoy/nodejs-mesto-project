import mongoose, { Model } from 'mongoose';
import { Joi } from 'celebrate';

import { IUser, TModelSettings } from '../utils/types';
import {
  ERROR_MESSAGES,
  DEFAULT_USER_SETTINGS as DEFAULT,
} from '../utils/constants';
import validation from '../utils/validation';

const { USER, GENERAL } = ERROR_MESSAGES;

interface IUserMethods {
  findUserByCredentials(email: string, password: string): Promise<IUser>;
}

// prettier-ignore
class UserModelSettings<
  T extends IUser,
  M extends IUserMethods & Model<T>,
> implements TModelSettings<T, M> {
  nameModel = 'user';

  validationSchema: Record<string, Joi.PartialSchemaMap<T>> = {
    base: {
      name: Joi.string()
        .label(GENERAL.LABELS.USERNAME)
        .min(2)
        .rule({ message: USER.VALIDATION.NAME })
        .max(30)
        .rule({ message: USER.VALIDATION.NAME }),
      about: Joi.string()
        .label(GENERAL.LABELS.ABOUT)
        .min(2)
        .rule({ message: USER.VALIDATION.ABOUT })
        .max(30)
        .rule({ message: USER.VALIDATION.ABOUT }),
      avatar: Joi.string()
        .label(GENERAL.LABELS.AVATAR)
        .custom(validation(USER.VALIDATION.AVATAR, 'url')),
    },
  };

  schema = new mongoose.Schema<T, M, IUserMethods>(
    {
      name: {
        type: String,
        minLength: 2,
        maxLength: 30,
        required: true,
        default: DEFAULT.NAME,
      },
      about: {
        type: String,
        minLength: 2,
        maxLength: 30,
        required: true,
        default: DEFAULT.ABOUT,
      },
      avatar: {
        type: String,
        required: true,
        default: DEFAULT.AVATAR,
      },
    },
    { versionKey: false },
  );

  get model() {
    return mongoose.model<T, M>(this.nameModel, this.schema);
  }
}

export const user = new UserModelSettings();

export default user.model;
