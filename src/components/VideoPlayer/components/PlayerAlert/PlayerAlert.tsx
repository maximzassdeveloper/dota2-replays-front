import { forwardRef, memo, ReactNode } from 'react'
import { cslx } from '../../common/utils/clsx'
import s from './PlayerAlert.module.css'

interface PlayerAlertProps {
  isOpen: boolean
  className?: string
  children?: ReactNode
}

export const PlayerAlert = memo(
  forwardRef<HTMLDivElement, PlayerAlertProps>((props, ref) => {
    const { children, isOpen, className } = props

    return isOpen ? (
      <div className={cslx(s.alert, className)} ref={ref}>
        {children}
      </div>
    ) : null
  })
)
