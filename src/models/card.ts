import mongoose, { Model } from 'mongoose';
import { Joi } from 'celebrate';

import { ICard, TModelSettings } from '../utils/types';
import { user } from './user';
import { ERROR_MESSAGES } from '../utils/constants';
import validation from '../utils/validation';

const { CARD, GENERAL } = ERROR_MESSAGES;

// prettier-ignore
class CardModelSettings<T extends ICard, M extends Model<T>> implements TModelSettings<T, M> {
  nameModel = 'card';

  validationSchema = {
    create: {
      name: Joi.string()
        .label(GENERAL.LABELS.CARD_NAME)
        .min(2)
        .rule({ message: CARD.VALIDATION.NAME })
        .max(30)
        .rule({ message: CARD.VALIDATION.NAME })
        .required(),
      link: Joi.string()
        .label(GENERAL.LABELS.LINK)
        .min(2)
        .required()
        .custom(validation(CARD.VALIDATION.LINK, 'url')),
    },
  };

  schema = new mongoose.Schema<T>(
    {
      name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
      },
      link: {
        type: String,
        required: true,
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user.nameModel,
        required: true,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: user.nameModel,
          default: [],
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { versionKey: false },
  );

  get model() {
    return mongoose.model<T>(this.nameModel, this.schema);
  }
}

export const card = new CardModelSettings();

export default card.model;
