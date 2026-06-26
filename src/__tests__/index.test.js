import { describe, it, expect, vi, afterEach } from 'vitest'
import { traceLog, sleep, storageFingerprint } from '../index.js'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('контракт пакета', () => {
  it('экспортирует все функции', () => {
    expect(traceLog).toBeTypeOf('function')
    expect(sleep).toBeTypeOf('function')
    expect(storageFingerprint).toBeTypeOf('function')
  })
})

describe('traceLog', () => {
  it('пишет в console.log с таймстампом и переданными аргументами', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

    traceLog('сообщение', 42)

    expect(spy).toHaveBeenCalledOnce()
    const [prefix, ...rest] = spy.mock.calls[0]
    expect(prefix).toMatch(/^\[\d{2}:\d{2}:\d{2}\.\d{3}\] \[.+\]$/)
    expect(rest).toEqual(['сообщение', 42])
  })
})

describe('sleep', () => {
  it('разрешается примерно через указанную задержку', async () => {
    vi.useFakeTimers()
    const promise = sleep(1500)
    let resolved = false
    promise.then(() => {
      resolved = true
    })

    await vi.advanceTimersByTimeAsync(1499)
    expect(resolved).toBe(false)

    await vi.advanceTimersByTimeAsync(1)
    await promise
    expect(resolved).toBe(true)

    vi.useRealTimers()
  })
})

describe('storageFingerprint', () => {
  const stubStorage = store => {
    vi.stubGlobal('localStorage', {
      getItem: key => (key in store ? store[key] : null),
    })
  }

  it('читает ключи и укорачивает значения до length', () => {
    stubStorage({
      'app:access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'app:refresh-token': 'rrrrrrrr-rest',
    })

    const result = storageFingerprint(
      [
        { key: 'app:access-token', label: 'at' },
        { key: 'app:refresh-token', label: 'rt' },
      ],
      { length: 8 }
    )

    expect(result).toEqual({ at: 'eyJhbGci…', rt: 'rrrrrrrr…' })
  })

  it('null для отсутствующих ключей', () => {
    stubStorage({})

    expect(storageFingerprint(['missing'])).toEqual({ missing: null })
  })

  it('строковый ключ используется и как label', () => {
    stubStorage({ short: 'ab' })

    expect(storageFingerprint(['short'], { length: 8 })).toEqual({ short: 'ab' })
  })

  it('truncate=false возвращает значение целиком', () => {
    stubStorage({ k: 'длинное-значение' })

    expect(storageFingerprint(['k'], { truncate: false })).toEqual({
      k: 'длинное-значение',
    })
  })
})
