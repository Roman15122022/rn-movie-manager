import { BASE } from '@/services/constants'
import { HttpInit } from '@/services/types'

export async function http(path: string, init: HttpInit = {}) {
  const token = process.env.EXPO_PUBLIC_TMDB_KEY?.trim()
  const url = `${BASE}${path}`
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    if (init.retry && init.retry > 0 && res.status >= 500) {
      return http(path, { ...init, retry: init.retry - 1 })
    }
    throw new Error(`HTTP ${res.status}: ${text || 'Error'}`)
  }
  return res.json()
}
