'use client'

import { useState } from 'react'
import { AuraBackground } from '@/components/signbridge/aura-background'
import { DashboardView } from '@/components/signbridge/dashboard/dashboard-view'
import { FutureScopeView } from '@/components/signbridge/future-scope/future-scope-view'
import { LandingView } from '@/components/signbridge/landing-view'

export function AppShell() {
  const [userName, setUserName] = useState<string | null>(null)
  const [showFutureScope, setShowFutureScope] = useState(false)

  function openFutureScope(open: boolean) {
    setShowFutureScope(open)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (userName) {
    return <DashboardView userName={userName} onLogout={() => setUserName(null)} />
  }

  if (showFutureScope) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#020b08] via-[#04110d] to-[#051410] text-white">
        <AuraBackground />
        <main className="relative z-10 mx-auto max-w-[1440px] px-6 py-10 sm:px-10 lg:px-16">
          <FutureScopeView onBack={() => openFutureScope(false)} backLabel="Back to Home" />
        </main>
      </div>
    )
  }

  return <LandingView onAuthenticated={setUserName} onOpenFutureScope={() => openFutureScope(true)} />
}
