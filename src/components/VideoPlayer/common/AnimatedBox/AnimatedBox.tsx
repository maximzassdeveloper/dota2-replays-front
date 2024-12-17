import { forwardRef, HTMLAttributes, ReactNode, useLayoutEffect, useRef } from 'react'
import { cslx } from '../utils/clsx'
import { composeRef } from '../utils/composeRef'
import s from './AnimatedBox.module.css'

// export type AnimatedBoxAnimation = 'fade-down'

interface AnimatedBoxProps extends HTMLAttributes<HTMLDivElement> {
  show?: boolean
  children: ReactNode
}

const ANIMATION_DURATION = 200

export const AnimatedBox = forwardRef<HTMLDivElement, AnimatedBoxProps>((props, ref) => {
  const { show, className, children, ...rest } = props

  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    let timeout: NodeJS.Timeout

    if (!show) {
      container.style.transform = `translateY(15px) scale(.98)`
      container.style.opacity = `0`

      timeout = setTimeout(() => {
        container.style.display = 'none'
      }, ANIMATION_DURATION)
    } else {
      container.style.display = 'block'

      timeout = setTimeout(() => {
        container.style.transform = `translateY(0px) scale(1)`
        container.style.opacity = `1`
      }, 50)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [show])

  return (
    <div ref={composeRef(containerRef, ref)} className={cslx(s.container, className)} {...rest}>
      {children}
    </div>
  )
})
