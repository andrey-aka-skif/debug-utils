/**
 * Промис-задержка: разрешается через указанное число миллисекунд.
 * Удобно для пауз и имитации длительных операций при отладке.
 *
 * @param {number} [ms=0] Длительность паузы в миллисекундах
 * @returns {Promise<void>}
 */
export const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))
