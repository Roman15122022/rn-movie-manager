import { BASE } from '@/services/constants'

export type HttpInit = RequestInit & { retry?: number }

export async function http(path: string, init: HttpInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  if (!res.ok) {
    if (init.retry && init.retry > 0 && res.status >= 500) {
      return http(path, { ...init, retry: init.retry - 1 })
    }
    const msg = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}: ${msg || 'Error'}`)
  }
  return res.json()
}
