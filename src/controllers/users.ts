import User from '../models/user';

import { HTTP_CODES, TUserCtrlParams } from '../utils/types';
import { ERROR_MESSAGES } from '../utils/constants';

const { USER } = ERROR_MESSAGES;
const { NOT_FOUND_404 } = HTTP_CODES;



export default class {
  static async getUsers(...[_, res]: TUserCtrlParams) {
    return res.send(await User.find());
  }


  static async getUser(...[req, res, next]: TUserCtrlParams) {
    const user = await User.findById(req.params.userId);
    return user
      ? res.send(user)
      : next(USER.GET[NOT_FOUND_404]);
  }


  static async updateProfile(...[req, res, next]: TUserCtrlParams) {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { name, about },
      { runValidators: true },
    );

    if (!user) return next(USER.PROFILE[NOT_FOUND_404]);

    return res.send({ name, about });
  }


  static async updateAvatar(...[req, res, next]: TUserCtrlParams) {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { avatar },
      { runValidators: true },
    );

    if (!user) return next(USER.AVATAR[NOT_FOUND_404]);

    return res.send({ avatar });
  }


  static async getMe(...[req, res]: TUserCtrlParams) {
    return res.send(await User.find({ _id: req.user?._id }));
  }
}
