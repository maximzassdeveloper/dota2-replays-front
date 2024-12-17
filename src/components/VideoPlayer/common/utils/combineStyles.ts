import type { CSSProperties } from 'react'

export const combineStyles = (...args: CSSProperties[]) => {
  const res: Record<string, any> = {}

  for (const obj of args) {
    if (!obj) continue

    for (const [key, val] of Object.entries(obj)) {
      if (res[key]) {
        res[key] += ` ${val}`
      } else {
        res[key] = val
      }
    }
  }

  return res
}
