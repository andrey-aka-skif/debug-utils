import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  __timedDebug__,
  __tokensFingerprint__,
  longActionImitation,
} from '../index.js'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('контракт пакета', () => {
  it('экспортирует все функции', () => {
    expect(__timedDebug__).toBeTypeOf('function')
    expect(__tokensFingerprint__).toBeTypeOf('function')
    expect(longActionImitation).toBeTypeOf('function')
  })
})

describe('__timedDebug__', () => {
  it('пишет в console.log с таймстампом и переданными аргументами', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

    __timedDebug__('сообщение', 42)

    expect(spy).toHaveBeenCalledOnce()
    const [prefix, ...rest] = spy.mock.calls[0]
    expect(prefix).toMatch(/^\[\d{2}:\d{2}:\d{2}\.\d{3}\] \[.+\]$/)
    expect(rest).toEqual(['сообщение', 42])
  })
})

describe('__tokensFingerprint__', () => {
  it('логирует укороченный отпечаток токенов', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

    __tokensFingerprint__({
      getAccessToken: () => 'access-token-value',
      getRefreshToken: () => 'refresh-token-value',
    })

    const payload = spy.mock.calls.at(-1).at(-1)
    expect(payload).toEqual({ at: 'access-t...', rt: 'refresh-...' })
  })
})

describe('longActionImitation', () => {
  it('разрешается примерно через указанную задержку', async () => {
    vi.useFakeTimers()
    const promise = longActionImitation(1500)
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
