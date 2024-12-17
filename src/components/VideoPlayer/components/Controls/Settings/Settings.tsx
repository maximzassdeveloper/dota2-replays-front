import { type FC, useState } from 'react'
import clsx from 'clsx'
import { useShallow } from 'zustand/shallow'
import { Settings as SettingsIcon } from 'lucide-react'
import { AnimatedBox } from '../../../common/AnimatedBox'
import { Panel, Screen } from '../../../common/Panel/Panel'
import type { VideoSource } from '../../../types'
import { useVideoPlayerStore } from '../../../store/videoPlayerStore'
import s from './Settings.module.css'

const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

export const PlayerSettings: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeScreen, setActiveScreen] = useState<'all' | 'speed' | 'quality'>('all')

  const { playbackRate, setPlaybackRate, sources, src, setCurrentSource } = useVideoPlayerStore(
    useShallow((state) => ({
      sources: state.sources,
      playbackRate: state.playbackRate,
      setPlaybackRate: state.setPlaybackRate,
      src: state.src,
      setCurrentSource: state.setCurrentSource,
    })),
  )

  const speedChangeHandler = (value: number) => {
    setPlaybackRate(value)
    setActiveScreen('all')
  }

  const qualityChangeHandler = (value: VideoSource['size']) => {
    const founded = sources.find((i) => i.size === value)
    if (!founded) return

    setCurrentSource(founded)
    setActiveScreen('all')
  }

  return (
    <div className={s.wrapper}>
      <AnimatedBox show={isOpen} className={s.settingsPopover}>
        <Panel activeScreen={activeScreen} className={s.settings}>
          <Screen name="all" className={s.screen}>
            <button className={s.settingItem} onClick={() => setActiveScreen('speed')}>
              Скорость
            </button>
            {/* <button className={s.settingItem} onClick={() => setActiveScreen('quality')}>
              Качество
            </button> */}
          </Screen>

          <Screen name="speed" className={s.screen}>
            <button className={s.settingItem} onClick={() => setActiveScreen('all')}>
              Назад
            </button>
            {speeds.map((speed) => (
              <button
                key={speed}
                className={clsx(s.settingItem, {
                  [s.active]: speed === playbackRate,
                })}
                onClick={() => speedChangeHandler(speed)}
              >
                {speed === 1 ? 'Обычная' : speed}
              </button>
            ))}
          </Screen>

          {/* <Screen name="quality" className={s.screen}>
            <button className={s.settingItem} onClick={() => setActiveScreen('all')}>
              Назад
            </button>
            {sources.map((source, index) => (
              <button
                key={index}
                className={clsx(s.settingItem, {
                  [s.active]: src.includes(source.url),
                })}
                onClick={() => qualityChangeHandler(source.size)}
              >
                {source.size === 3840 ? '4k для тиграна' : source.size + 'p'}
              </button>
            ))}
          </Screen> */}
        </Panel>
      </AnimatedBox>

      <button onClick={() => setIsOpen((prev) => !prev)} style={{ color: '#fff' }}>
        <SettingsIcon />
      </button>
    </div>
  )
}
