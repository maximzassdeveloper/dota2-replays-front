import { useRef, type MouseEventHandler, type MouseEvent, forwardRef, ReactNode } from 'react'
import { cslx } from '../utils/clsx'
import { composeRef } from '../utils/composeRef'
import { useDrag } from './hooks/useDrag'
import s from './Slider.module.css'

export interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  className?: string
  showLabel?: boolean
  labelText?: string | number
  addonAfter?: ReactNode

  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
  onMouseMove?: MouseEventHandler<HTMLDivElement>
  onChange?: (value: number) => void
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    value,
    className,
    min = 0,
    max = 100,
    showLabel = true,
    labelText,
    addonAfter,
    onChange,
    onMouseDown,
    ...rest
  } = props

  const sliderRef = useRef<HTMLDivElement>(null)

  const getValueInPercents = (): number => {
    return Math.round(((value - min) / (max - min)) * 100)
  }

  const onUpdateOffset = () => {
    const val = Math.round((max - min) * (offset.current / 100) + min)
    onChange?.(val)
  }

  const { offset, onStartMove } = useDrag(sliderRef, onUpdateOffset)

  const mouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    onStartMove(e)
    onMouseDown?.(e)
  }

  const offsetPercents = getValueInPercents()

  return (
    <div
      ref={composeRef(sliderRef, ref)}
      className={cslx(s.slider, className)}
      role="slider"
      tabIndex={0}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuemax={max}
      onMouseDown={mouseDownHandler}
      {...rest}
    >
      <div className={s.rail} />

      <div className={s.track} style={{ width: `${offsetPercents}%` }} />

      <div className={s.handle} style={{ left: `${offsetPercents}%` }}>
        {showLabel && <span>{labelText ?? Math.round(value)}</span>}
      </div>

      {addonAfter}
    </div>
  )
})
