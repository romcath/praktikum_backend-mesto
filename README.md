# REST API проекта Mesto

###### Версия проекта: 0.3.2

## О проекте
API для сервиса размещения фотографий [Mesto](https://github.com/romcath/mesto).
> Это учебный проект, сделан в [Яндекс.Практикуме](https://praktikum.yandex.ru).


## Функционал
1. Регистрация нового пользователя
2. Авторизация пользователя по адресу почты и паролю
3. Редактирование профиля пользователя
4. Создание и удаление карточки
5. Постановка и снятие лайка карточке

## Взаимодействие с API
### 1. Параметры запроса при регистрации
#### Метод
```POST```
#### Эндпоинт
```/signup```
#### Заголовки
```"Content-Type": "application/json"```
#### Тело запроса
```
{
  "email": "email@yandex.ru",
  "password": "somepassword"
}
```
#### Успешный ответ
```
{
  "name": "Жак-Ив Кусто",
  "about": "Исследователь",
  "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  "_id": "60182fb51c40e93938e67a2f",
  "email": "email@yandex.ru"
}
```
### 2. Параметры запроса при авторизации
#### Метод
```POST```
#### Эндпоинт
```/signin```
#### Заголовки
```"Content-Type": "application/json"```
#### Тело запроса
```
{
  "email": "email@yandex.ru",
  "password": "somepassword"
}
```
#### Успешный ответ
В случае успешной авторизации будет отправлен токен JWT.

### 3. Параметры запроса информации о пользователе
#### Метод
```GET```
#### Эндпоинт
```/users/me```
#### Заголовки
```"Content-Type": "application/json"```
#### Успешный ответ
```
{
  "name": "Жак-Ив Кусто",
  "about": "Исследователь",
  "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  "_id": "60182fb51c40e93938e67a2f",
  "email": "email@yandex.ru"
}
```
### 4. Параметры запроса при обновлении профиля пользователя
#### Метод
```PATCH```
#### Эндпоинт
```/users/me```
#### Заголовки
```"Content-Type": "application/json"```
#### Тело запроса
```
{
  "name": "Жак-Ив Кусто",
  "about": "Исследователь океана"
}
```
#### Успешный ответ
```
{
  "name": "Жак-Ив Кусто",
  "about": "Исследователь океана",
  "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  "_id": "60182fb51c40e93938e67a2f",
  "email": "email@yandex.ru"
}
```
### 5. Параметры запроса при обновлении аватара пользователя
#### Метод
```PATCH```
#### Эндпоинт
```/users/me/avatar```
#### Заголовки
```"Content-Type": "application/json"```
#### Тело запроса
```
{
  "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
}
```
#### Успешный ответ
```
{
  "name": "Жак-Ив Кусто",
  "about": "Исследователь океана",
  "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  "_id": "60182fb51c40e93938e67a2f",
  "email": "email@yandex.ru"
}
```
### 6. Параметры запроса для загрузки всех карточек
#### Метод
```GET```
#### Эндпоинт
```/cards```
#### Заголовки
```"Content-Type": "application/json"```
#### Успешный ответ
```
[
  {
    "likes": [
      "60182d270bd4f11210007332"
    ],
    "_id": "6017ece90ece1d04f493300e",
    "name": "Название места",
    "link": "https://images.unsplash.com",
    "owner": "6017ecd30ece1d04f493300d",
    "createdAt": "2021-02-01T11:58:33.930Z"
    }
]
```
### 7. Параметры запроса при создании карточки
#### Метод
```POST```
#### Эндпоинт
```/cards```
#### Заголовки
```"Content-Type": "application/json"```
#### Тело запроса
```
{
  "name": "Название места",
  "link": "https://images.unsplash.com"
}
```
#### Успешный ответ
```
{
  "likes": [],
  "_id": "60183aff1c40e93938e67a30",
  "name": "Название места,
  "link": "https://images.unsplash.com",
  "owner": "60182fb51c40e93938e67a2f",
  "createdAt": "2021-02-01T17:31:43.319Z"
}
```
### 8. Параметры запроса при удалении карточки по id
#### Метод
```DELETE```
#### Эндпоинт
```/cards/{cardId}```
#### Заголовки
```"Content-Type": "application/json"```
#### Успешный ответ
```
{
  "likes": [],
  "_id": "60183aff1c40e93938e67a30",
  "name": "Название места,
  "link": "https://images.unsplash.com",
  "owner": "60182fb51c40e93938e67a2f",
  "createdAt": "2021-02-01T17:31:43.319Z"
}
```
### 9. Параметры запроса при постановке лайка карточке
#### Метод
```PUT```
#### Эндпоинт
```/cards/like/{cardId}```
#### Заголовки
```"Content-Type": "application/json"```
#### Успешный ответ
```
{
  "likes": [
    "60182d270bd4f11210007332",
    "60182fb51c40e93938e67a2f"
  ],
  "_id": "6017ece90ece1d04f493300e",
  "name": "Название места",
  "link": "https://images.unsplash.com",
  "owner": "6017ecd30ece1d04f493300d",
  "createdAt": "2021-02-01T11:58:33.930Z"
}
```
### 10. Параметры запроса при удалении лайка карточке
#### Метод
```DELETE```
#### Эндпоинт
```/cards/like/{cardId}```
#### Заголовки
```"Content-Type": "application/json"```
#### Успешный ответ
```
{
  "likes": [
    "60182d270bd4f11210007332"
  ],
  "_id": "6017ece90ece1d04f493300e",
  "name": "Название места",
  "link": "https://images.unsplash.com",
  "owner": "6017ecd30ece1d04f493300d",
  "createdAt": "2021-02-01T11:58:33.930Z"
}
```


## Установка проекта
Установите базу данных [MongoDB](https://docs.mongodb.com/manual/administration/install-community/).

Клонируйте репозиторий на компьютер

```git clone https://github.com/romcath/mesto-api.git```

Установите зависисмости

```npm install```

Запустите сервер

```npm start```


## Стек технологий
JavaScript, GIT, Node.js, Express.js, MongoDB
