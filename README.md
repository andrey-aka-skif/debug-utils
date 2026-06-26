# @andrey-aka-skif/debug-utils

Набор небольших утилит для отладки. Коллекция пополняется по мере необходимости.

## Установка

Реестр пакета — GitHub Packages. Его npm-реестр требует токен с правом
`read:packages` ([settings/tokens](https://github.com/settings/tokens)) даже
для публичных пакетов — анонимная установка не поддерживается (в отличие от
Container-реестра ghcr.io).

В `.npmrc` проекта-потребителя (токен берётся из env, в файл не пишется):

```
@andrey-aka-skif:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

Значение токена — в переменной окружения; имя своё под каждый проект, поэтому
можно держать разные токены. Например, в PowerShell:

```powershell
[System.Environment]::SetEnvironmentVariable('GH_PACKAGES_TOKEN', 'ghp_…', 'User')
```

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
