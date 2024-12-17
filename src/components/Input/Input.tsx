import { forwardRef, InputHTMLAttributes } from 'react'
import s from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { ...rest } = props

  return <input className={s.input} ref={ref} {...rest} />
})

