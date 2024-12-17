import React, { useLayoutEffect, useMemo, useRef } from 'react'
import s from './Panel.module.css'
import { usePrevious } from '../hooks/usePrevious'
import { cslx } from '../utils/clsx'

interface ScreenProps {
  name: string
  className?: string
  _active?: boolean
  _direction?: number
  children: React.ReactNode
  style?: React.CSSProperties
}

const ANIMATION_DURATION = 200

export const Screen: React.FC<ScreenProps> = (props) => {
  const { name, _active, style, _direction = 1, className, children } = props

  const screenRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const screen = screenRef.current
    if (!screen) return

    if (_active) {
      if (_direction !== 0) {
        screen.style.transform = `translateX(${_direction > 0 ? 100 : -100}%)`
        screen.style.opacity = `0`
      }
      screen.style.display = 'block'

      setTimeout(() => {
        screen.style.opacity = '1'
        screen.style.transform = 'translateX(0%)'
      }, 50)
    } else {
      screen.style.transform = `translateX(${_direction > 0 ? -100 : 100}%)`
      screen.style.opacity = '0'

      setTimeout(() => {
        screen.style.display = 'none'
      }, ANIMATION_DURATION)
    }
  }, [_active, _direction])

  return (
    <div
      ref={screenRef}
      data-name={name}
      style={{
        display: 'none',
        transition: `opacity ${ANIMATION_DURATION}ms, transform ${ANIMATION_DURATION}ms`,
        ...style,
      }}
      className={cslx(s.screen, className)}
    >
      {children}
    </div>
  )
}

interface PanelProps {
  activeScreen: string
  className?: string
  children: React.ReactNode
}

export const Panel: React.FC<PanelProps> = (props) => {
  const { activeScreen, children, className } = props
  const panelRef = useRef<HTMLDivElement>(null)

  /* -------------------- Work with children -------------------- */

  const screenIndexesByNames = React.useMemo(() => {
    const screenNameIndexMap: Record<string, number> = {}

    React.Children.forEach(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return
      }

      const name = child.props.name as string | undefined
      if (name) {
        screenNameIndexMap[name] = index
      } else {
        if (import.meta.env.DEV) {
          console.error('Child component of Panel should have prop `name`')
        }
      }
    })

    return screenNameIndexMap
  }, [children])

  const activeIndex = useMemo(
    () => screenIndexesByNames[activeScreen],
    [screenIndexesByNames, activeScreen]
  )
  const previousActiveIndex = usePrevious(activeIndex)

  const animationDirection = activeIndex - previousActiveIndex

  const resultChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child
    }

    return React.cloneElement(child, {
      _direction: animationDirection,
      _active: child.props.name === activeScreen,
      style: { zIndex: index },
    } as ScreenProps)
  })

  /* -------------------- Work with sizes -------------------- */

  useLayoutEffect(() => {
    if (!panelRef.current) return

    let activeChild = null as HTMLElement | null
    panelRef.current.childNodes.forEach((node) => {
      if (node instanceof HTMLElement && node.dataset.name === activeScreen) {
        activeChild = node
      }
    })

    if (activeChild) {
      const { offsetWidth, offsetHeight } = activeChild

      panelRef.current.style.width = `${offsetWidth}px`
      panelRef.current.style.height = `${offsetHeight}px`
    }
  }, [activeScreen])

  /* -------------------- JSX -------------------- */

  return (
    <div ref={panelRef} className={cslx(s.panel, className)}>
      {resultChildren}
    </div>
  )
}
