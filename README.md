# Сервер для проекта Mesto

###### Версия проекта: 0.1.5

## О проекте
API для сервиса размещения фотографий Mesto.
> Это учебный проект, сделан в [Яндекс.Практикуме](https://praktikum.yandex.ru). Код проходил код-ревью.

## Взаимодействие с API:
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
      "_id": "5e7481a2c7a9e507b868c0db",
      "name": "Новый пользователь",
      "about": "Разработчик",
      "avatar": "https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?ixlib=rb-1.2.  ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1012&q=80",
      "__v": 0
    },
    {
      "_id": "5e748414ee353c26ec76f3fd",
      "name": "Тестовый пользователь",
      "about": "Информация о себе",
      "avatar": "https://images.unsplash.com",
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
```http://localhost:3000/users/5e748414ee353c26ec76f3fd```
#### Пример ответа
```
{
    "data": {
        "_id": "5e748414ee353c26ec76f3fd",
        "name": "Тестовый пользователь",
        "about": "Информация о себе",
        "avatar": "https://images.unsplash.com",
        "__v": 0
    }
} 
```
### 3. Создание пользователя
#### Метод
```POST```
#### Адрес
```localhost:3000/users```
#### Пример запроса
```
{
    "name": "Тестовый пользователь",
    "about": "Информация о себе",
    "avatar": "https://images.unsplash.com"
}
```
#### Пример ответа
```
{
    "data": {
        "_id": "5e748414ee353c26ec76f3fd",
        "name": "Тестовый пользователь",
        "about": "Информация о себе",
        "avatar": "https://images.unsplash.com",
        "__v": 0
    }
} 
```
### 4. Обновление профиля
#### Метод
```PATCH```
#### Адрес
```localhost:3000/users/me```
#### Пример запроса
```
{
    "name": "Пользователь",
    "about": "Обновленный пользователь"
}
```
#### Пример ответа
```
{
    "data": {
        "_id": "5e7481a2c7a9e507b868c0db",
        "name": "Пользователь",
        "about": "Обновленный пользователь",
        "avatar": "https://images.unsplash.com",
        "__v": 0
    }
} 
```
### 5. Обновление аватара пользователя
#### Метод
```PATCH```
#### Адрес
```localhost:3000/users/me/avatar```
#### Пример запроса
```
{
    "avatar": "https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1012&q=80"
}
```
#### Пример ответа
```
{
    "data": {
        "_id": "5e7481a2c7a9e507b868c0db",
        "name": "Пользователь",
        "about": "Обновленный пользователь",
        "avatar": "https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1012&q=80",
        "__v": 0
    }
} 
```
### 6. Загрузка всех карточек
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
### 7. Создание карточки
#### Метод
```POST```
#### Адрес
```localhost:3000/cards```
#### Пример запроса
```
{
    "name": "Республика Коми",
    "link": "https://images.unsplash.com/flagged/photo-1575556809963-3d9e5730eda0?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
}
```
#### Пример ответа
```
{
    "data": {
        "likes": [],
        "_id": "5e75dc092b752a2958806282",
        "name": "Республика Коми",
        "link": "https://images.unsplash.com/flagged/photo-1575556809963-3d9e5730eda0?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "owner": "5e7481a2c7a9e507b868c0db",
        "createdAt": "2020-03-21T09:19:05.716Z",
        "__v": 0
    }
} 
```
### 8. Удаление карточки по идентификатору
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
        "link": "https://images.unsplash.com/flagged/photo-1575556809963-3d9e5730eda0?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "owner": "5e7481a2c7a9e507b868c0db",
        "createdAt": "2020-03-21T09:19:05.716Z",
        "__v": 0
    }
} 
```
### 9. Постановка лайка карточке
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
                "avatar": "https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1012&q=80",
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
            "avatar": "https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1012&q=80",
            "__v": 0
        },
        "createdAt": "2020-03-20T11:06:42.667Z",
        "__v": 0
    }
}
```
### 10. Удаление лайка карточки
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
### Примечание
1. Во всех запросах, где необходимо передавать в теле запроса JSON-объект, в заголовках запроса указывайте ```'Content-Type': 'application/json'```
2. В сервисе реализовано временное решение авторизации.


## Установка проекта
Клонируйте репозиторий на компьютер:

```git clone https://github.com/romcath/praktikum_backend-mesto.git```

Установите зависисмости:

```npm install```

Запустите сервер:

```npm run start```


## Стек технологий
JavaScript, GIT, Node.js, Express.js, MongoDB
