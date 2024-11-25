import { NOTFOUND } from 'dns';
import { HTTP_CODES } from './types';

export const DEFAULT_PORT = 4000;
export const DEFAULT_BASE_PATH = 'http://localhost';
export const DEFAULT_MONGO_DB_PATH = 'mongodb://localhost:27017';
export const DEFAULT_MONGO_DB_NAME = 'mestodb';
export const DEFAULT_SALT_LENGTH = 10;
export const DEFAULT_JWT_SECRET = 'JWT_SECRET';
// eslint-ignore-quotes next-line
export const ALLOWED_SYMBOLS_IN_LINK = /-\._~:\/\?#\[\]@!$&'\(\)\*\+,;=/.source;

export const DEFAULT_USER_SETTINGS = {
  NAME: 'Жак-Ив Кусто',
  ABOUT: 'Исследователь',
  AVATAR:
    'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

const {
  BAD_REQUEST_400,
  FORBIDDEN_403,
  NOT_FOUND_404,
} = HTTP_CODES;

export const ERROR_MESSAGES = {
  GENERAL: {
    VALIDATION: {
      EMPTY: 'Поле {#label} не должно быть пустым.',
      SYNTAX_JSON: 'Синтаксическая ошибка в теле запроса.',
      UNKNOWN: 'Поле {#label} недопустимый параметр для данного запроса.',
    },
    LABELS: {
      AVATAR: 'Аватарка',
      USERNAME: 'Имя',
      ABOUT: 'О себе',
      LINK: 'Ссылка на картинку',
      CARD_NAME: 'Название карточки',
    },
    NOTFOUND: {
      [NOT_FOUND_404]: 'Страница не найдена.',
    }
  },
  USER: {
    VALIDATION: {
      NAME: 'Имя должно быть не меньше 2 символов и не более 30 символов.',
      ABOUT: 'Описание должно быть не меньше 2 символов и не более 30 символов.',
      AVATAR: 'Некорректный адрес ссылки аватарки.',
    },
    GET: {
      [NOT_FOUND_404]: 'Пользователь по указанному _id не найден.',
    },
    PROFILE: {
      [NOT_FOUND_404]: 'Пользователь с указанным _id не найден.',
    },
    AVATAR: {
      [NOT_FOUND_404]: 'Пользователь с указанным _id не найден.',
    },
  },
  CARD: {
    VALIDATION: {
      NAME: 'Название должно быть не меньше 2 символов и не более 30 символов.',
      LINK: 'Некорректный адрес ссылки картинки для карточки.',
      EMPTY: 'Поле не должно быть пустым.',
    },
    DELETE: {
      [BAD_REQUEST_400]: 'Переданы некорректные данные для удаления карточки.',
      [FORBIDDEN_403]: 'Попытка удалить чужую карточку.',
    },
    LIKE: {
      [NOT_FOUND_404]: 'Передан несуществующий _id карточки.',
    },
  },
};
