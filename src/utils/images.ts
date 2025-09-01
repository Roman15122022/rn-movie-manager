export const IMG = {
  poster: (p?: string | null, w: number = 342) =>
    p ? `https://image.tmdb.org/t/p/w${w}${p}` : undefined,
  backdrop: (p?: string | null, w: number = 780) =>
    p ? `https://image.tmdb.org/t/p/w${w}${p}` : undefined,
}
