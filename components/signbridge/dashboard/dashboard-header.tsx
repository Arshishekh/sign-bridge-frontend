'use client'

import { Bell, ChevronDown, Hand, LogOut, Settings, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function DashboardHeader({
  userName,
  onLogout,
  onHome,
  isHome,
  onAbout,
  isAbout,
}: {
  userName: string
  onLogout: () => void
  onHome: () => void
  isHome: boolean
  onAbout: () => void
  isAbout: boolean
}) {
  const links = [
    { label: 'Home', href: '#', active: isHome, onClick: onHome },
    { label: 'Features', href: '#features', active: false, onClick: onHome },
    { label: 'About', href: '#', active: isAbout, onClick: onAbout },
    { label: 'Contact', href: '#contact', active: false },
  ]
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="flex items-center justify-between gap-6 border-b border-white/[0.06] px-5 py-4 sm:px-8">
      <div className="flex items-center gap-12">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onHome()
          }}
          className="flex items-center gap-2.5"
          aria-label="SignBridge home"
        >
          <Hand
            className="size-7 text-lime drop-shadow-[0_0_10px_rgba(197,255,102,0.6)]"
            strokeWidth={2.25}
            aria-hidden="true"
          />
          <span className="text-xl font-semibold tracking-tight">SignBridge</span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10 text-sm text-white/80">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={
                    link.onClick
                      ? (e) => {
                          if (link.href === '#') e.preventDefault()
                          link.onClick?.()
                        }
                      : undefined
                  }
                  aria-current={link.active ? 'page' : undefined}
                  className={
                    link.active
                      ? 'relative py-2 text-lime after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-lime'
                      : 'py-2 transition-colors hover:text-white'
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-white/80 transition-colors hover:bg-white/5 hover:text-lime"
        >
          <Bell className="size-5" aria-hidden="true" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-lime" aria-hidden="true" />
        </button>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-white/5"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-sm font-medium">
              {userName.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm font-medium">{userName}</span>
            <ChevronDown
              className={`size-4 text-white/70 transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#06150f]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              <div className="px-3 py-2.5">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-white/50">Signed in</p>
              </div>
              <div className="my-1 h-px bg-white/10" />
              <MenuItem icon={User} label="Profile" onSelect={() => setOpen(false)} />
              <MenuItem icon={Settings} label="Settings" onSelect={() => setOpen(false)} />
              <div className="my-1 h-px bg-white/10" />
              <MenuItem icon={LogOut} label="Log Out" onSelect={onLogout} accent />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function MenuItem({
  icon: Icon,
  label,
  onSelect,
  accent,
}: {
  icon: typeof User
  label: string
  onSelect: () => void
  accent?: boolean
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/[0.06] ${
        accent ? 'text-lime' : 'text-white/85'
      }`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </button>
  )
}
