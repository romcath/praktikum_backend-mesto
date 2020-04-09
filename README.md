# Сервер для проекта Mesto

###### Версия проекта: 0.2.3

## О проекте
API для сервиса размещения фотографий [Mesto](https://github.com/romcath/praktikum_mesto).
> Это учебный проект, сделан в [Яндекс.Практикуме](https://praktikum.yandex.ru). Код проходил код-ревью.

## Функционал
1. Регистрация нового пользователя
2. Аутентификация пользователя по адресу почты и паролю
3. Редактирование профиля пользователя
4. Создание и удаление карточки
5. Постановка и снятие лайка карточке

## Взаимодействие с API
### 1. Загрузка информации о всех пользователях
#### Метод
```GET```
#### Адрес
```localhost:3000/users```
#### Пример запроса
```http://localhost:3000/users```
#### Пример ответа
```
{
  "data":
  [
    {
      "_id": "5e8dac1f07e59f162c59fbf2",
      "name": "Пользователь 1",
      "about": "Разработчик",
      "avatar": "https://images.unsplash.com/photo-1520453803296",
      "email": "user1@ya.ru",
      "__v": 0
    },
    {
      "_id": "5e8daecf07e59f162c59fbf3",
      "name": "Пользователь 2",
      "about": "Инженер",
      "avatar": "https://images.unsplash.com",
      "email": "user2@ya.ru",
      "__v": 0
    }
  ]
} 
```
### 2. Загрузка пользователя по идентификатору
#### Метод
```GET```
#### Адрес
```localhost:3000/users/{userId}```
#### Пример запроса
```http://localhost:3000/users/5e8daecf07e59f162c59fbf3```
#### Пример ответа
```
{
    "data": {
        "_id": "5e8daecf07e59f162c59fbf3",
        "name": "Пользователь 2",
        "about": "Инженер",
        "avatar": "https://images.unsplash.com",
        "email": "user2@ya.ru",
        "__v": 0
    }
} 
```
### 3. Регистрация пользователя
#### Метод
```POST```
#### Адрес
```localhost:3000/signup```
#### Пример запроса
```
{
    "name": "Пользователь 3",
    "about": "Путешественник",
    "avatar": "https://images.unsplash.com",
    "email": "user3@ya.ru",
    "password": "user3"
}
```
#### Пример ответа
```
{
    "data": {
        "_id": "5e8e17879f294739e04e5781",
        "name": "Пользователь 3",
        "about": "Путешественник",
        "avatar": "https://images.unsplash.com",
        "email": "user3@ya.ru",
        "password": "$2a$10$Qv.tog4hyU.p0FsxGj621uPfP8nZAj.X1gOATO6.qHeMTNohBvvMu",
        "__v": 0
    }
} 
```
### 4. Аутентификация пользователя по электронной почте и паролю
#### Метод
```POST```
#### Адрес
```localhost:3000/signin```
#### Пример запроса
```
{
    "email": "user3@ya.ru",
    "password": "user3"
}
```
#### Ответ
В случае успешной аутентификации пользователю будет отправлен токен JWT.

### 5. Обновление профиля
#### Метод
```PATCH```
#### Адрес
```localhost:3000/users/me```
#### Пример запроса
```
{
    "name": "Пользователь 5",
    "about": "Учёный"
}
```
#### Пример ответа
```
{
    "data": {
        "_id": "5e8e17879f294739e04e5781",
        "name": "Пользователь 5",
        "about": "Учёный",
        "avatar": "https://images.unsplash.com",
        "email": "user3@ya.ru",
        "__v": 0
    }
} 
```
### 6. Обновление аватара пользователя
#### Метод
```PATCH```
#### Адрес
```localhost:3000/users/me/avatar```
#### Пример запроса
```
{
    "avatar": "https://images.unsplash.com/photo-1520453803296"
}
```
#### Пример ответа
```
{
    "data": {
        "_id": "5e8e17879f294739e04e5781",
        "name": "Пользователь 5",
        "about": "Учёный",
        "avatar": "https://images.unsplash.com/photo-1520453803296",
        "email": "user3@ya.ru",
        "__v": 0
    }
} 
```
### 7. Загрузка всех карточек
#### Метод
```GET```
#### Адрес
```localhost:3000/cards```
#### Пример запроса
```http://localhost:3000/cards```
#### Пример ответа
```
{
    "data": [
        {
            "likes": [],
            "_id": "5e74a3c2bbc5d4392417c107",
            "name": "Карелия",
            "link": "https://images.unsplash.com",
            "owner": "5e7481a2c7a9e507b868c0db",
            "createdAt": "2020-03-20T11:06:42.667Z",
            "__v": 0
        }
    ]
} 
```
### 8. Создание карточки
#### Метод
```POST```
#### Адрес
```localhost:3000/cards```
#### Пример запроса
```
{
    "name": "Республика Коми",
    "link": "https://images.unsplash.com/flagged/photo-1575556809963"
}
```
#### Пример ответа
```
{
    "data": {
        "likes": [],
        "_id": "5e75dc092b752a2958806282",
        "name": "Республика Коми",
        "link": "https://images.unsplash.com/flagged/photo-1575556809963",
        "owner": "5e7481a2c7a9e507b868c0db",
        "createdAt": "2020-03-21T09:19:05.716Z",
        "__v": 0
    }
} 
```
### 9. Удаление карточки по идентификатору
#### Метод
```DELETE```
#### Адрес
```localhost:3000/cards/{cardId}```
#### Пример запроса
```http://localhost:3000/cards/5e75dc092b752a2958806282```
#### Пример ответа
```
{
    "data": {
        "likes": [],
        "_id": "5e75dc092b752a2958806282",
        "name": "Республика Коми",
        "link": "https://images.unsplash.com/flagged/photo-1575556809963",
        "owner": "5e7481a2c7a9e507b868c0db",
        "createdAt": "2020-03-21T09:19:05.716Z",
        "__v": 0
    }
} 
```
### 10. Постановка лайка карточке
#### Метод
```PUT```
#### Адрес
```localhost:3000/cards/{cardId}/likes```
#### Пример запроса
```http://localhost:3000/cards/5e74a3c2bbc5d4392417c107/likes```
#### Пример ответа
```
{
    "data": {
        "likes": [
            {
                "_id": "5e7481a2c7a9e507b868c0db",
                "name": "Пользователь",
                "about": "Обновленный пользователь",
                "avatar": "https://images.unsplash.com/photo-1520453803296",
                "__v": 0
            }
        ],
        "_id": "5e74a3c2bbc5d4392417c107",
        "name": "Тестовый пользователь",
        "link": "https://images.unsplash.com",
        "owner": {
            "_id": "5e7481a2c7a9e507b868c0db",
            "name": "Пользователь",
            "about": "Обновленный пользователь",
            "avatar": "https://images.unsplash.com/photo-1520453803296",
            "__v": 0
        },
        "createdAt": "2020-03-20T11:06:42.667Z",
        "__v": 0
    }
}
```
### 11. Удаление лайка карточки
#### Метод
```DELETE```
#### Адрес
```localhost:3000/cards/{cardId}/likes```
#### Пример запроса
```http://localhost:3000/cards/5e74a3c2bbc5d4392417c107/likes```
#### Пример ответа
```
{
    "data": {
        "likes": [],
        "_id": "5e74a3c2bbc5d4392417c107",
        "name": "Тестовый пользователь",
        "link": "https://images.unsplash.com",
        "owner": "5e7481a2c7a9e507b868c0db",
        "createdAt": "2020-03-20T11:06:42.667Z",
        "__v": 0
    }
}
```

## Установка проекта
Клонируйте репозиторий на компьютер:

```git clone https://github.com/romcath/praktikum_backend-mesto.git```

Установите зависисмости:

```npm install```

Запустите сервер:

```npm run start```


## Стек технологий
JavaScript, GIT, Node.js, Express.js, MongoDB
