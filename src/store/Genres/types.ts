export type Mode = 'all' | 'any'

export type SelectedGenresState = {
    selected: number[]
    mode: Mode
    toggle: (id: number) => void
    setMany: (ids: number[]) => void
    clear: () => void
    isActive: (id: number) => boolean
    toggleMode: () => void
    setMode: (mode: Mode) => void
}