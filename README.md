<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Наименование

Приложение агрегатор отелей

## Запуск

Удобнее всего запустить через docker compose

```bash
$ docker compose --env-file .env up
```

Так же можно запустить в dev режиме

```bash
$ docker compose --env-file .env -f docker-compose.dev.yml up
```

## Краткое описание

По ссылке можно посмотреть ТЗ
https://github.com/netology-code/ndjs-diplom

Приложение реализуется модули 

- Пользователи
- Авторизация
- Управление отелями
- Управление номерами в отелях
- Бронирование отелей
- Оттел поддержки с чатом

## Использованные технологии

- Бекенд на nest
- Хеширование паролей bcrypt
- Авторизация passport local
- Система ролей nest Guard
- Загрузка файлов multer
- База MongoDB с библиотекой Mongoose
- Использовал фичу монго populate и deep populate (связанные коллекции)
- Для чата Socket.io
- Валидация class-validator


