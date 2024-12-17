type Mode = Record<string, string | boolean | undefined | null>
type ArgType = string | number | undefined | null | (string | undefined | null)[] | Mode

export function cslx(...args: ArgType[]): string {
  let classes: string[] = []

  for (const arg of args) {
    if (!arg) continue
    const argType = typeof arg

    if (argType === 'number' || argType === 'string') {
      classes.push(arg.toString())
      continue
    }

    if (Array.isArray(arg)) {
      const filtered = arg.filter((i) => !!i) as string[]
      classes = [...classes, ...filtered]
      continue
    }

    if (argType === 'object') {
      for (const key in arg as Mode) {
        if (key !== 'undefined' && (arg as Mode)[key]) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}
