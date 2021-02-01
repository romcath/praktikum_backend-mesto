const NOT_FOUND = 'Запрашиваемый ресурс не найден';
const LOGOUT = 'Вы вышли из системы';

const CARD_NOT_FOUND = 'Нет карточки с таким id';
const CARD_CAN_NOT_DEL = 'Вы не можете удалить карточку, созданную другим пользователем';
const CARD_LINK_INCORRECT = 'Некорректный формат ссылки для карточки';

const USER_NOT_FOUND = 'Пользователь не найден';
const USER_CAN_NOT_CREATE = 'Ошибка при создании пользователя';
const USER_EMAIL_CONFLICT = 'Электронная почта уже существует';
const USER_EMAIL_INCORRECT = 'Некорректный формат для электронной почты';
const USER_AVATAR_LINK_INCORRECT = 'Некорректный формат ссылки для аватара пользователя';

const NAME_DEFAULT = 'Жак-Ив Кусто';
const ABOUT_DEFAULT = 'Исследователь';
const AVATAR_DEFAULT = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

const REQUEST_LOGIN = 'Необходима авторизация';
const SERVER_ERROR = 'На сервере произошла ошибка';

const INCORRECT_EMAIL_PASS = 'Неправильные почта или пароль';
const INCORRECT_ID = 'Некорректный формат {#label}';
const INCORRECT_URL = 'Некорректный формат ссылки поля';

const VALIDATION_ERRORS = {
  'string.empty': 'Поле {#label} не может быть пустым',
  'string.min': 'Поле {#label} не может быть меньше {#limit} символов',
  'string.max': 'Поле {#label} не может быть больше {#limit} символов',
  'any.required': 'Отсутствует обязательное поле {#label}',
  'string.email': 'Некорректный формат поля {#label}',
};

module.exports = {
  NOT_FOUND,
  LOGOUT,

  CARD_NOT_FOUND,
  CARD_CAN_NOT_DEL,
  CARD_LINK_INCORRECT,

  USER_NOT_FOUND,
  USER_CAN_NOT_CREATE,
  USER_EMAIL_CONFLICT,
  USER_EMAIL_INCORRECT,
  USER_AVATAR_LINK_INCORRECT,

  NAME_DEFAULT,
  ABOUT_DEFAULT,
  AVATAR_DEFAULT,

  REQUEST_LOGIN,
  SERVER_ERROR,

  INCORRECT_EMAIL_PASS,
  INCORRECT_ID,
  INCORRECT_URL,

  VALIDATION_ERRORS,
};
