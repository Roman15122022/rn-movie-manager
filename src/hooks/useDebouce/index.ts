import { useRef, useCallback, useState, useEffect } from 'react'
import { DebounceFunction } from '@/hooks/useDebouce/types'

export const useDebounce = <T extends unknown[]>(
  callback: DebounceFunction<T>,
  delay: number
) => {
  const [isLoading, setIsLoading] = useState(false)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedFn: DebounceFunction<T> = useCallback(
    (...args: T) => {
      setIsLoading(true)
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = setTimeout(() => {
        callback(...args)
        setIsLoading(false)
      }, delay)
    },
    [callback, delay]
  )

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
    }
  }, [])

  return { callback: debouncedFn, isLoading }
}
