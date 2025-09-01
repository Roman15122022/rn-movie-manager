import { useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/useDebouce'
import { DEFAULT_DEBOUNCED_DELAY } from '@/constants'

export const useDebounceState = (
  defaultValue = '',
  debounceDelay = DEFAULT_DEBOUNCED_DELAY
) => {
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [debouncedValue, setDebouncedValue] = useState(defaultValue)

  const { callback: setDebounced } = useDebounce<[string]>(
    (next) => setDebouncedValue(next),
    debounceDelay
  )

  const handleChangeText = useCallback(
    (text: string) => {
      setCurrentValue(text)
      setDebounced(text)
    },
    [setDebounced]
  )

  return [
    currentValue,
    debouncedValue,
    handleChangeText,
    setDebouncedValue,
    setCurrentValue,
  ] as const
}
