import { create } from 'zustand'
import {SelectedGenresState} from "@/store/Genres/types";

export const useSelectedGenres = create<SelectedGenresState>((set, get) => ({
    selected: [],
    mode: 'all',
    toggle: (id) =>
        set((state) => {
            const exists = state.selected.includes(id)
            return {
                selected: exists
                    ? state.selected.filter((x) => x !== id)
                    : [...state.selected, id],
            }
        }),
    setMany: (ids) => set({ selected: Array.from(new Set(ids)) }),
    clear: () => set({ selected: [] }),
    isActive: (id) => get().selected.includes(id),
    toggleMode: () => set({ mode: get().mode === 'all' ? 'any' : 'all' }),
    setMode: (mode) => set({ mode }),
}))