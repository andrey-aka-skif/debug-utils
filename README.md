# @andrey-aka-skif/debug-utils

Небольшой набор утилит для отладки, вынесенный из плагина `jwt-auth-plugin`.

## Установка

```bash
npm install @andrey-aka-skif/debug-utils
```

## Контракт пакета

```js
import {
  traceLog,
  sleep,
  storageFingerprint,
} from '@andrey-aka-skif/debug-utils'
```

### `traceLog(...args)`

Логирует аргументы в консоль с таймстампом и контекстом вызова (имя функции
либо `файл:строка`, вычисляется из стека).

```js
traceLog('Сессия восстановлена', user)
// [17:42:03.128] [restoreSession] Сессия восстановлена { ... }
```

### `sleep(ms = 0)`

Промис, разрешающийся через `ms` мс. Пауза / имитация длительной операции.

```js
await sleep(1500)
```

### `storageFingerprint(keys, { length = 8, truncate = true })`

Снимает «отпечаток» записей `localStorage`: читает указанные ключи и возвращает
объект с укороченными значениями. Ничего не логирует — модуль не знает смысла
данных. Для вывода скомпонуйте с логгером.

`keys` — массив строк или объектов `{ key, label }` (label задаёт имя поля в
результате; по умолчанию равен ключу).

```js
traceLog(
  storageFingerprint(
    [
      { key: 'app:access-token', label: 'at' },
      { key: 'app:refresh-token', label: 'rt' },
    ],
    { length: 8 }
  )
)
// [17:42:03.131] [?] { at: 'eyJhbGci…', rt: 'eyJ0eXAi…' }
```

Отсутствующий ключ → `null`. `truncate: false` возвращает значение целиком.

## Локальная разработка

```bash
npm install
npm run lint
npm test
```
