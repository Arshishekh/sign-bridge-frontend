'use client'

import { Hand } from 'lucide-react'
import { useCallback, useState } from 'react'
import { CameraFeed, type CameraStatus, type FacingMode } from '@/components/signbridge/detection/camera-feed'
import { type HistoryItem, RecognitionPanel } from '@/components/signbridge/detection/recognition-panel'

const initialHistory: HistoryItem[] = [
  { word: 'Hello', time: '2 mins ago' },
  { word: 'Thank you', time: '5 mins ago' },
  { word: 'Please', time: '8 mins ago' },
  { word: 'Sorry', time: '12 mins ago' },
  { word: 'Yes', time: '18 mins ago' },
]

const statusStyles: Record<CameraStatus, { label: string; dot: string; pill: string }> = {
  active: {
    label: 'Camera Active',
    dot: 'bg-lime shadow-[0_0_10px_#c5ff66] animate-pulse',
    pill: 'border-lime/40 text-lime shadow-[0_0_24px_rgba(197,255,102,0.2)]',
  },
  starting: { label: 'Starting Camera', dot: 'bg-amber-300 animate-pulse', pill: 'border-amber-300/30 text-amber-200' },
  off: { label: 'Camera Off', dot: 'bg-white/40', pill: 'border-white/15 text-white/70' },
  error: { label: 'Camera Unavailable', dot: 'bg-red-400', pill: 'border-red-400/30 text-red-300' },
}

export function DetectionView() {
  const [cameraOn, setCameraOn] = useState(true)
  const [facingMode, setFacingMode] = useState<FacingMode>('user')
  const [model, setModel] = useState('isl-custom')
  const [status, setStatus] = useState<CameraStatus>('starting')
  const [errorMessage, setErrorMessage] = useState<string>()
  const [sign, setSign] = useState<string | null>('Hello')

  const handleStatusChange = useCallback((next: CameraStatus, message?: string) => {
    setStatus(next)
    setErrorMessage(message)
  }, [])

  const pill = statusStyles[status]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl">ISL Detection</h1>
          <p className="mt-2 text-pretty text-white/70">{"Show your sign. We'll take care of the rest."}</p>
        </div>
        <p
          role="status"
          className={`flex w-fit items-center gap-2.5 rounded-full border bg-black/30 px-4 py-2 text-sm font-medium backdrop-blur-md ${pill.pill}`}
        >
          <span className={`size-2.5 rounded-full ${pill.dot}`} aria-hidden="true" />
          {pill.label}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <CameraFeed
          enabled={cameraOn}
          facingMode={facingMode}
          status={status}
          errorMessage={errorMessage}
          onStatusChange={handleStatusChange}
          onToggle={() => setCameraOn((v) => !v)}
          onFacingModeChange={setFacingMode}
          model={model}
          onModelChange={setModel}
        />
        <RecognitionPanel
          sign={sign}
          history={initialHistory}
          onClear={() => setSign(null)}
          onSelectHistory={setSign}
        />
      </div>

      <aside className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/[0.1] via-[#061a14]/60 to-lime/[0.06] p-6 backdrop-blur-xl">
        <svg
          viewBox="0 0 600 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full opacity-60"
          aria-hidden="true"
        >
          <path d="M0 80 C 120 20, 240 120, 360 60 S 540 30, 600 70" fill="none" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" />
          <path d="M0 95 C 150 50, 260 130, 400 75 S 560 55, 600 90" fill="none" stroke="rgba(197,255,102,0.35)" strokeWidth="1" />
        </svg>
        <div className="relative flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-lime/40 bg-emerald-500/[0.1] shadow-[0_0_24px_rgba(197,255,102,0.25)]">
            <Hand className="size-6 text-lime" aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium">Indian Sign Language</p>
            <p className="text-sm text-white/70">Same hands. Different language. Same feelings.</p>
          </div>
        </div>
      </aside>
    </div>
  )
}
