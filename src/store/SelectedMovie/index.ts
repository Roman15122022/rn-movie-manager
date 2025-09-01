import { create } from 'zustand'

type SelectionState = {
  selectedId: number | null
  setSelectedId: (id: number | null) => void
}

export const useSelection = create<SelectionState>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}))
