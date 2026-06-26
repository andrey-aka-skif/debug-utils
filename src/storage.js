/**
 * Снимает «отпечаток» записей localStorage: читает указанные ключи и
 * возвращает объект с (по умолчанию укороченными) значениями.
 *
 * Модуль не знает смысла данных — только снимает слепок по ключам. Ничего
 * не логирует; для вывода скомпонуйте с логгером: `traceLog(storageFingerprint(...))`.
 *
 * @param {Array<string | { key: string, label?: string }>} [keys] Ключи (или {key, label})
 * @param {{ length?: number, truncate?: boolean }} [options]
 * @returns {Record<string, string | null>} Отпечаток: label → значение (или null, если ключа нет)
 */
export const storageFingerprint = (
  keys = [],
  { length = 8, truncate = true } = {}
) => {
  const result = {}

  for (const entry of keys) {
    const key = typeof entry === 'string' ? entry : entry.key
    const label = typeof entry === 'string' ? entry : (entry.label ?? entry.key)

    const value = localStorage.getItem(key)

    if (value === null) {
      result[label] = null
      continue
    }

    result[label] =
      truncate && value.length > length ? `${value.slice(0, length)}…` : value
  }

  return result
}
