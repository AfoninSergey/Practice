npm run server
npm start

ОБЛАСТИ ХРАНЕНИЯ ДАННЫХ:
- БД (db) на JSON Server
- BFF
- Redux Store

СУЩНОСТИ ПРИЛОЖЕНИЯ:
- Пользователи (users):  	БД (всегда),
					    	BFF (текущая сессия пользователя),
					    	Redux Store (для вывода в браузере)

- Роль пользов-ля (role)	БД (всегда),
					    	BFF (текущая сессия пользователя с ролью),
					    	Redux Store (для вывода в браузере)

- Список статей (posts)		БД (всегда),

					    	Redux Store (для вывода в браузере)

- Комментарии (comments)	БД (всегда),

					    	Redux Store (для вывода в браузере)

ТАБЛИЦЫ (СХЕМЫ) БД:
- users: id / login / password / registered_at / role_id

- roles: id / name

- posts: id / title / image_url / content / published_at

- comments: id / author_id (users: id) / post_id (posts: id) / content / published_at

ТАБЛИЦЫ (СХЕМЫ) BFF:
- user-session: login / password / role

ТАБЛИЦЫ (СХЕМЫ) Redux Store:
- users: []
- user: id/ login / roleId / registeredAt / session
- posts: []
- post: title / imageUrl / content / publishedAt / commentsCount
- comments: []
- comment: author_id (users: id) / post_id (posts: id) / content / published_at



