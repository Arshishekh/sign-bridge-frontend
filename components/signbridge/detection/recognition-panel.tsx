'use client'

import { ChevronRight, History, Trash2, Volume2 } from 'lucide-react'
import { useRef, useState } from 'react'

export type HistoryItem = { word: string; time: string }

const waveHeights = [25, 45, 70, 50, 90, 65, 100, 55, 80, 40, 60, 30, 50, 20]

const cardClass =
  'rounded-3xl border border-emerald-400/20 bg-[#061a14]/50 p-5 shadow-[0_0_40px_rgba(16,185,129,0.06),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl'

export function speak(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-IN'
  utterance.onend = () => onEnd?.()
  utterance.onerror = () => onEnd?.()
  window.speechSynthesis.speak(utterance)
  return true
}

export function RecognitionPanel({
  sign,
  history,
  onClear,
  onSelectHistory,
}: {
  sign: string | null
  history: HistoryItem[]
  onClear: () => void
  onSelectHistory: (word: string) => void
}) {
  const [speaking, setSpeaking] = useState(false)
  const historyRef = useRef<HTMLElement>(null)

  function handleSpeak() {
    if (!sign) return
    if (speak(sign, () => setSpeaking(false))) setSpeaking(true)
  }

  function focusHistory() {
    historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    historyRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="flex flex-col gap-5">
      <section aria-labelledby="recognized-heading" className={cardClass}>
        <h2 id="recognized-heading" className="text-sm font-medium text-white/70">
          Recognized Sign
        </h2>

        <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-lime/25 bg-emerald-500/[0.06] p-5 shadow-[inset_0_0_30px_rgba(16,185,129,0.1)]">
          <div aria-live="polite">
            {sign ? (
              <>
                <p className="text-4xl font-medium tracking-tight text-lime drop-shadow-[0_0_14px_rgba(197,255,102,0.45)]">
                  {sign}
                </p>
                <p className="mt-1 text-xs text-white/60">(ISL Sign Detected)</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-medium text-white/40">{'—'}</p>
                <p className="mt-1 text-xs text-white/50">Waiting for a sign...</p>
              </>
            )}
          </div>
          <div className="flex h-14 items-center gap-1" aria-hidden="true">
            {waveHeights.map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-gradient-to-t from-emerald-500/60 to-lime shadow-[0_0_8px_rgba(197,255,102,0.5)] transition-opacity ${
                  speaking ? 'animate-pulse' : ''
                } ${sign ? 'opacity-100' : 'opacity-25'}`}
                style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSpeak}
            disabled={!sign}
            className="flex h-11 items-center justify-center gap-2 rounded-full bg-lime text-sm font-medium text-[#0a1a0f] shadow-[0_0_24px_rgba(197,255,102,0.3)] transition-all hover:shadow-[0_0_36px_rgba(197,255,102,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            <Volume2 className="size-4" aria-hidden="true" />
            {speaking ? 'Speaking...' : 'Convert to Speech'}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!sign}
            className="flex h-11 items-center justify-center gap-2 rounded-full border border-lime/35 bg-black/20 text-sm text-white transition-all hover:border-lime/70 hover:bg-lime/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Clear
          </button>
          <button
            type="button"
            onClick={focusHistory}
            className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-full border border-emerald-400/20 bg-white/[0.03] text-sm text-white/85 transition-colors hover:border-lime/40 hover:text-white"
          >
            <History className="size-4" aria-hidden="true" />
            View History
          </button>
        </div>
      </section>

      <section
        ref={historyRef}
        tabIndex={-1}
        aria-labelledby="history-heading"
        className={`${cardClass} outline-none focus-visible:border-lime/50`}
      >
        <div className="flex items-center justify-between">
          <h2 id="history-heading" className="text-sm font-medium text-white/70">
            Recent History
          </h2>
          <button
            type="button"
            onClick={focusHistory}
            className="flex items-center gap-0.5 text-xs text-lime transition-colors hover:text-lime/80"
          >
            View All
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
        <ul className="mt-3 divide-y divide-white/[0.06]">
          {history.map((item) => (
            <li key={`${item.word}-${item.time}`} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectHistory(item.word)}
                className="flex flex-1 items-center justify-between gap-3 rounded-lg py-3 pl-1 pr-2 text-left transition-colors hover:text-lime"
              >
                <span className="text-sm font-medium">{item.word}</span>
                <span className="text-xs text-white/50">{item.time}</span>
              </button>
              <button
                type="button"
                onClick={() => speak(item.word)}
                aria-label={`Speak ${item.word}`}
                className="flex size-8 items-center justify-center rounded-full border border-emerald-400/20 text-white/70 transition-colors hover:border-lime/50 hover:text-lime"
              >
                <Volume2 className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
