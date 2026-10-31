'use client'

import { CameraOff, ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'

export type FacingMode = 'user' | 'environment'
export type CameraStatus = 'off' | 'starting' | 'active' | 'error'

const landmarks: [number, number][] = [
  [50, 88],
  [40, 80], [33, 70], [28, 60], [24, 51],
  [43, 58], [41, 44], [40, 35], [39, 27],
  [51, 56], [52, 41], [53, 31], [54, 22],
  [58, 58], [61, 45], [63, 37], [65, 30],
  [64, 63], [69, 53], [72, 47], [75, 41],
]

const bones: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
]

export function CameraFeed({
  enabled,
  facingMode,
  status,
  errorMessage,
  onStatusChange,
  onToggle,
  onFacingModeChange,
  model,
  onModelChange,
}: {
  enabled: boolean
  facingMode: FacingMode
  status: CameraStatus
  errorMessage?: string
  onStatusChange: (status: CameraStatus, message?: string) => void
  onToggle: () => void
  onFacingModeChange: (mode: FacingMode) => void
  model: string
  onModelChange: (model: string) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!enabled) {
      onStatusChange('off')
      return
    }

    let stream: MediaStream | null = null
    let cancelled = false

    async function start() {
      onStatusChange('starting')
      if (!navigator.mediaDevices?.getUserMedia) {
        onStatusChange('error', 'Camera is not supported in this browser.')
        return
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode }, audio: false })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        if (videoRef.current) videoRef.current.srcObject = stream
        onStatusChange('active')
      } catch (err) {
        if (cancelled) return
        const denied = err instanceof DOMException && err.name === 'NotAllowedError'
        onStatusChange(
          'error',
          denied ? 'Camera permission was denied. Allow access in your browser to start detecting.' : 'Unable to access a camera on this device.',
        )
      }
    }

    start()

    return () => {
      cancelled = true
      stream?.getTracks().forEach((t) => t.stop())
      if (videoRef.current) videoRef.current.srcObject = null
    }
  }, [enabled, facingMode, onStatusChange])

  const active = status === 'active'

  return (
    <section
      aria-label="Live camera feed"
      className="flex flex-col self-start rounded-3xl border border-emerald-400/20 bg-[#061a14]/50 p-4 shadow-[0_0_40px_rgba(16,185,129,0.06),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-lime/30 bg-[#020806] shadow-[0_0_40px_rgba(197,255,102,0.12),inset_0_0_60px_rgba(16,185,129,0.12)]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`size-full object-cover transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'} ${
            facingMode === 'user' ? '-scale-x-100' : ''
          }`}
        />

        {active && (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-[12%] rounded-2xl border-2 border-lime/70 shadow-[0_0_24px_rgba(197,255,102,0.45),inset_0_0_24px_rgba(197,255,102,0.2)]">
              {['left-0 top-0 border-l-4 border-t-4 rounded-tl-xl', 'right-0 top-0 border-r-4 border-t-4 rounded-tr-xl', 'left-0 bottom-0 border-l-4 border-b-4 rounded-bl-xl', 'right-0 bottom-0 border-r-4 border-b-4 rounded-br-xl'].map((c) => (
                <span key={c} className={`absolute -m-1 size-6 border-lime ${c}`} />
              ))}
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-[12%] size-[76%] animate-pulse">
              {bones.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  x1={landmarks[a][0]}
                  y1={landmarks[a][1]}
                  x2={landmarks[b][0]}
                  y2={landmarks[b][1]}
                  stroke="rgba(52,211,153,0.85)"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />
              ))}
              {landmarks.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="1.1" fill="#c5ff66" style={{ filter: 'drop-shadow(0 0 2px #c5ff66)' }} />
              ))}
            </svg>
            <span className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 rounded-full border border-lime/40 bg-black/60 px-4 py-1.5 text-xs font-medium text-lime backdrop-blur-md">
              <span className="size-2 animate-pulse rounded-full bg-lime shadow-[0_0_8px_#c5ff66]" />
              Detecting...
            </span>
          </div>
        )}

        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/[0.08] shadow-[0_0_24px_rgba(16,185,129,0.25)]">
              <CameraOff className="size-6 text-white/80" aria-hidden="true" />
            </span>
            <p className="max-w-xs text-pretty text-sm text-white/70" role="status">
              {status === 'starting' && 'Starting camera...'}
              {status === 'off' && 'Camera is off. Turn it on to start detecting signs.'}
              {status === 'error' && (errorMessage || 'Unable to access the camera.')}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={onToggle}
          className="flex h-11 items-center gap-3 rounded-full border border-emerald-400/20 bg-black/20 px-4 text-sm transition-colors hover:border-lime/40"
        >
          <span
            className={`relative h-6 w-11 rounded-full transition-colors ${
              enabled ? 'bg-lime shadow-[0_0_14px_rgba(197,255,102,0.5)]' : 'bg-white/15'
            }`}
            aria-hidden="true"
          >
            <span
              className={`absolute top-0.5 size-5 rounded-full bg-[#06150f] transition-all ${enabled ? 'left-[22px]' : 'left-0.5 bg-white/80'}`}
            />
          </span>
          {enabled ? 'Camera On' : 'Camera Off'}
        </button>

        <Select
          label="Camera"
          value={facingMode}
          onChange={(v) => onFacingModeChange(v as FacingMode)}
          options={[
            { value: 'user', label: 'Front Camera' },
            { value: 'environment', label: 'Back Camera' },
          ]}
        />
        <Select
          label="Detection model"
          value={model}
          onChange={onModelChange}
          options={[
            { value: 'isl-custom', label: 'ISL (Custom)' },
            { value: 'isl-mediapipe', label: 'ISL (MediaPipe)' },
          ]}
        />
      </div>
    </section>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="relative flex-1 basis-40">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-full border border-emerald-400/20 bg-black/20 pl-4 pr-10 text-sm text-white outline-none transition-colors hover:border-lime/40 focus-visible:border-lime/70 [&>option]:bg-[#06150f]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/60" aria-hidden="true" />
    </label>
  )
}
