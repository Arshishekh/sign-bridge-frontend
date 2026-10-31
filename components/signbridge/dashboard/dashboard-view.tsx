'use client'

import { Hand, Heart } from 'lucide-react'
import { useState } from 'react'
import { AuraBackground } from '@/components/signbridge/aura-background'
import { DashboardHeader } from '@/components/signbridge/dashboard/dashboard-header'
import { type DashboardSection, DashboardSidebar } from '@/components/signbridge/dashboard/dashboard-sidebar'
import { FeatureCards } from '@/components/signbridge/dashboard/feature-cards'
import { DetectionView } from '@/components/signbridge/detection/detection-view'
import { FutureScopeView } from '@/components/signbridge/future-scope/future-scope-view'

export function DashboardView({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  const [section, setSection] = useState<DashboardSection>('dashboard')

  function navigate(next: DashboardSection) {
    setSection(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#030706] via-[#06110d] to-[#0b0f0e] p-3 text-white sm:p-5">
      <AuraBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-[1440px] flex-col rounded-[28px] border border-emerald-400/20 bg-[#030a08]/60 shadow-[0_0_80px_rgba(16,185,129,0.08)] backdrop-blur-md">
        <DashboardHeader
          userName={userName}
          onLogout={onLogout}
          onHome={() => navigate('dashboard')}
          isHome={section === 'dashboard'}
          onAbout={() => navigate('future')}
          isAbout={section === 'future'}
        />

        <div className="flex flex-1 flex-col lg:flex-row">
          <DashboardSidebar active={section} onNavigate={navigate} />

          <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">
            {section === 'future' ? (
              <FutureScopeView onBack={() => navigate('dashboard')} backLabel="Back to Dashboard" />
            ) : section === 'detection' ? (
              <DetectionView />
            ) : (
              <>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div className="max-w-xl">
                <h1 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl">
                  Welcome to SignBridge, {userName}!
                </h1>
                <p className="mt-3 text-pretty leading-relaxed text-white/70">
                  Break the barriers of communication. Explore the features below to see how SignBridge helps you
                  connect.
                </p>
              </div>
              <p className="flex items-center gap-3 text-sm leading-snug text-lime/90">
                <Hand
                  className="size-8 shrink-0 text-lime drop-shadow-[0_0_10px_rgba(197,255,102,0.6)]"
                  aria-hidden="true"
                />
                <span>
                  Small gestures.
                  <br />
                  <span className="text-white/80">Big conversations.</span>
                </span>
              </p>
            </div>

            <div className="mt-10">
              <FeatureCards onStartDetection={() => navigate('detection')} />
            </div>
              </>
            )}
          </main>
        </div>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-5 text-xs text-white/60 sm:flex-row sm:px-8">
          <p className="flex items-center gap-2">
            {'© 2025 SignBridge. Built for a more inclusive world.'}
            <Heart className="size-3.5" aria-label="love" />
          </p>
          <nav aria-label="Footer">
            <ul className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Help'].map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </div>
    </div>
  )
}
