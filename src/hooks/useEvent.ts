import * as React from 'react'

type AnyFunction = (...args: any) => any

export function useEvent<T extends AnyFunction>(callback?: T) {
  const ref = React.useRef<AnyFunction | undefined>(callback)

  React.useInsertionEffect(() => {
    ref.current = callback
  })

  return React.useCallback<AnyFunction>((...args) => ref.current?.(...args), []) as T
}

