import Card from '../models/card';

import { ERROR_MESSAGES } from '../utils/constants';
import { HTTP_CODES, TCardCtrlParams } from '../utils/types';

const { CARD } = ERROR_MESSAGES;
const { BAD_REQUEST_400, NOT_FOUND_404, FORBIDDEN_403 } = HTTP_CODES;



export default class {
  static async getCards(...[_, res]: TCardCtrlParams) {
    return res.send(await Card.find());
  }


  static async createCard(...[req, res]: TCardCtrlParams) {
    const { name, link } = req.body;
    const owner = req.user?._id;
    const card = await Card.create({ name, link, owner });
    return res.status(HTTP_CODES.CREATED_201).send(card);
  }


  static async deleteCard(...[req, res, next]: TCardCtrlParams) {
    const card = await Card.findById(req.params.cardId);

    if (!card) return next(CARD.DELETE[BAD_REQUEST_400]);

    if (req.user?._id === card.owner.toString()) {
      return res.send(await Card.findByIdAndDelete(req.params.cardId));
    }
    return next(CARD.DELETE[FORBIDDEN_403]);
  }


  static async likeCard(...[req, res, next]: TCardCtrlParams) {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    );

    if (!card) return next(CARD.LIKE[NOT_FOUND_404]);

    return res.send(card);
  }


  static async dislikeCard(...[req, res, next]: TCardCtrlParams) {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true },
    );

    if (!card) return next(CARD.LIKE[NOT_FOUND_404]);

    return res.send(card);
  }
}
