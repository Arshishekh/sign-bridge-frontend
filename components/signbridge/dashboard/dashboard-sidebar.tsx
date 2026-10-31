'use client'

import { Hand, History, House, Settings, User } from 'lucide-react'
export type DashboardSection = 'dashboard' | 'detection' | 'history' | 'profile' | 'settings' | 'future'

const items: { id: DashboardSection; label: string; icon: typeof House }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: House },
  { id: 'detection', label: 'ISL Detection', icon: Hand },
  { id: 'history', label: 'History', icon: History },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function DashboardSidebar({
  active,
  onNavigate,
}: {
  active: DashboardSection
  onNavigate: (section: DashboardSection) => void
}) {
  return (
    <nav
      aria-label="Dashboard"
      className="border-b border-white/[0.06] p-4 lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-5"
    >
      <ul className="flex gap-1.5 overflow-x-auto lg:flex-col">
        {items.map(({ id, label, icon: Icon }) => {
          const selected = active === id
          return (
            <li key={id} className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={selected ? 'page' : undefined}
                className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3 text-sm transition-colors ${
                  selected
                    ? 'border-emerald-400/25 bg-emerald-500/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                    : 'border-transparent text-white/75 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <Icon className={`size-5 ${selected ? 'text-lime' : ''}`} aria-hidden="true" />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
