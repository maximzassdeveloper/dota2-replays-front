import { ButtonHTMLAttributes, forwardRef } from 'react'
import s from './Button.module.css'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, ...rest } = props

  return (
    <button className={clsx(s.button, className)} ref={ref} {...rest}>
      {children}
    </button>
  )
})

