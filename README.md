# Социальная сеть на React
Это Single Page Application с использованием React, Redux, Axios и других библиотек, который я делал по урокам ["React JS - Путь самурая"](https://www.youtube.com/playlist?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8). <br/>
Функционал: Просмотр и редактирование профилей, поиск профилей, подписка/отписка на профили, чат.<br/>
API, который я использовал: https://social-network.samuraijs.com/docs

### Проект опубликован на github pages!
https://nougatcat.github.io/react-js-social-network

### Важно!
1. Версия без TypeScript сохранена в ветке no_typescript<br/>
Версия со всеми компонентами сохранена в ветке way-of-samurai
2. Тестовая учетная запись: Email: free@samuraijs.com, пароль: free
3. Если хотите клонировать репозиторий: redux-form может быть установлен только с помощью --force. Из-за этого при клонировании репозитория надо писать `npm install --force`. Это происходит из-за того, что redux-form официально не поддерживает React 18, но по факту всё работает. Чтобы не пришлось снова использовать --force, имеет смысл в новых проектах использовать Formik вместо redux-form.

### Запуск на http://localhost:3000 - `npm start`
### Запуск тестов - `npm test`
### Деплой - `npm run deploy`