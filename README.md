# @andrey-aka-skif/debug-utils

Небольшой набор утилит для отладки, вынесенный из плагина `jwt-auth-plugin`.

## Установка

```bash
npm install @andrey-aka-skif/debug-utils
```

## Контракт пакета

```js
import {
  __timedDebug__,
  __tokensFingerprint__,
  longActionImitation,
} from '@andrey-aka-skif/debug-utils'
```

### `__timedDebug__(...args)`

Логирует аргументы в консоль с таймстампом и контекстом вызова (имя функции
либо `файл:строка`, вычисляется из стека).

```js
__timedDebug__('Сессия восстановлена', user)
// [17:42:03.128] [restoreSession] Сессия восстановлена { ... }
```

### `__tokensFingerprint__(tokensStorage)`

Логирует укороченный «отпечаток» пары токенов (первые 8 символов access/refresh).
Ожидает объект с методами `getAccessToken()` и `getRefreshToken()`.

```js
__tokensFingerprint__(tokenStorage)
// [17:42:03.131] [?] { at: 'eyJhbGci...', rt: 'eyJ0eXAi...' }
```

### `longActionImitation(duration = 2000)`

Промис, разрешающийся через `duration` мс. Имитация длительной операции для
отладки состояний загрузки.

```js
await longActionImitation(1500)
```

## Локальная разработка

```bash
npm install
npm run lint
npm test
```
