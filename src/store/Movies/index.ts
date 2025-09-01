import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MoviesFavoritesContextType } from '@/store/Movies/types'
import { NAME_STORE_MOVIES_FAV } from '@/store/Movies/constants'

export const useMovies = create<MoviesFavoritesContextType>()(
  persist(
    (set, get) => ({
      favorites: [],
      onlyFavs: false,
      toggleFav: (id) => {
        const cur = get().favorites
        set({
          favorites: cur.includes(id)
            ? cur.filter((x) => x !== id)
            : [...cur, id],
        })
      },
      toggleOnlyFavs: () => set((s) => ({ onlyFavs: !s.onlyFavs })),
    }),
    {
      name: NAME_STORE_MOVIES_FAV,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
