import * as React from 'react'
import { usePagination } from '@mantine/hooks'
import clsx from 'clsx'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import s from './Pagination.module.css'

export interface PaginationParams {
  initialPage?: number
  page?: number
  total: number
  siblings?: number
  boundaries?: number
  onChange?: (page: number) => void
}

interface PaginationItemProps {
  page: number | 'dots' | 'prev' | 'next'
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const contents: Record<string, any> = {
  dots: '...',
  next: <ArrowRight />,
  prev: <ArrowLeft />,
}

function PaginationItem({ page, active, className, ...buttonProps }: PaginationItemProps) {
  const dotsProps =
    page === 'dots'
      ? {
          'aria-hidden': true,
          'disabled': true,
          'tabIndex': -1,
        }
      : {}
  const children = contents[page] || page

  return (
    <button
      {...buttonProps}
      {...dotsProps}
      className={clsx(s.item, className, { [s.active]: active })}
    >
      {children}
    </button>
  )
}

// ------------------------------------------------------------------

export interface PaginationProps
  extends PaginationParams,
    Omit<React.ComponentPropsWithoutRef<'nav'>, keyof PaginationParams | 'children'> {
  /** Show/hide prev/next controls */
  withControls?: boolean
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  {
    // pagination params
    initialPage,
    page,
    total,
    siblings,
    boundaries,
    onChange,

    // other
    withControls,
    ...rootProps
  },
  ref,
) {
  const { range, setPage, next, previous, active } = usePagination({
    initialPage,
    page,
    total,
    siblings,
    boundaries,
    onChange,
  })

  const items = range.map((page, index) => (
    <li className="flex-none" key={index}>
      <PaginationItem
        page={page}
        onClick={page === 'dots' ? undefined : () => setPage(page)}
        active={page === active}
        aria-label={page === active ? `Страница ${page}, текущая страница` : `Страница ${page}`}
        {...(page === active ? { 'aria-current': 'true' } : {})}
      />
    </li>
  ))

  return (
    <nav role="navigation" aria-label="Навигация по страницам" {...rootProps} ref={ref}>
      <ul className={s.list}>
        {withControls && (
          <li className="flex-none">
            <PaginationItem page="prev" disabled={active === 1} onClick={previous} />
          </li>
        )}

        {items}

        {withControls && (
          <li className="flex-none">
            <PaginationItem page="next" disabled={active === total} onClick={next} />
          </li>
        )}
      </ul>
    </nav>
  )
})

