'use client'

import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import {
  useId,
  useState,
  type ComponentType,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'

type Mode = 'signin' | 'signup'

function displayNameFrom(fullName: string, email: string) {
  const source = fullName.trim().split(/\s+/)[0] || email.split('@')[0] || 'Eliza'
  return source.charAt(0).toUpperCase() + source.slice(1)
}

export function AuthCard({ onAuthenticated }: { onAuthenticated: (name: string) => void }) {
  const [mode, setMode] = useState<Mode>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const isSignIn = mode === 'signin'

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    onAuthenticated(displayNameFrom(String(data.get('name') ?? ''), String(data.get('email') ?? '')))
  }

  return (
    <section
      aria-labelledby="auth-heading"
      className="relative w-full rounded-[28px] border border-emerald-400/25 bg-[#061d18]/45 p-7 shadow-[0_0_60px_rgba(16,185,129,0.12),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-10 lg:justify-self-end"
    >
      <div role="tablist" aria-label="Authentication" className="grid grid-cols-2 border-b border-white/10">
        {(
          [
            ['signin', 'Sign In'],
            ['signup', 'Create Account'],
          ] as const
        ).map(([value, label]) => {
          const selected = mode === value
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setMode(value)}
              className={`relative pb-4 text-base transition-colors ${
                selected ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
              {selected && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-lime shadow-[0_0_12px_rgba(197,255,102,0.7)]" />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        <h2 id="auth-heading" className="text-2xl font-medium sm:text-[28px]">
          {isSignIn ? 'Welcome back!' : 'Join SignBridge'}
        </h2>
        <p className="mt-1.5 text-white/70">
          {isSignIn ? 'Sign in to continue to SignBridge' : 'Create your account to get started'}
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        {!isSignIn && (
          <Field icon={User} label="Full Name" name="name" autoComplete="name" placeholder="Your name" />
        )}
        <Field
          icon={Mail}
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <Field
          icon={Lock}
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete={isSignIn ? 'current-password' : 'new-password'}
          placeholder="Enter your password"
          required
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="rounded-md p-1 text-white/80 transition-colors hover:text-lime"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          }
        />

        {isSignIn && (
          <div className="mt-1 flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-3 text-white/80">
              <input
                type="checkbox"
                name="remember"
                className="size-4 cursor-pointer rounded-sm border-white/30 accent-lime"
              />
              Remember me
            </label>
            <a href="#" className="text-lime transition-opacity hover:opacity-80">
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit"
          className="mt-3 flex h-[52px] items-center justify-center gap-3 rounded-full bg-lime font-medium text-[#0a1a0f] shadow-[0_0_30px_rgba(197,255,102,0.3)] transition-all hover:shadow-[0_0_40px_rgba(197,255,102,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
          {isSignIn ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="my-7 flex items-center gap-4 text-sm text-white/60">
        <span className="h-px flex-1 bg-white/10" />
        or
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={() => onAuthenticated('Eliza')}
        className="flex h-[52px] w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-black/20 text-sm font-medium transition-colors hover:border-lime/40 hover:bg-white/[0.04]"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-white/70">
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => setMode(isSignIn ? 'signup' : 'signin')}
          className="ml-2 font-medium text-lime transition-opacity hover:opacity-80"
        >
          {isSignIn ? 'Create one' : 'Sign in'}
        </button>
      </p>
    </section>
  )
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ComponentType<{ className?: string }>
  label: string
  trailing?: ReactNode
}

function Field({ icon: Icon, label, trailing, ...props }: FieldProps) {
  const id = useId()
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/25 px-5 py-3 transition-colors focus-within:border-lime/50 focus-within:shadow-[0_0_0_3px_rgba(197,255,102,0.08)]">
      <Icon className="size-5 shrink-0 text-white/80" aria-hidden="true" />
      <div className="flex flex-1 flex-col">
        <label htmlFor={id} className="text-xs text-white/85">
          {label}
        </label>
        <input
          id={id}
          {...props}
          className="mt-0.5 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
      </div>
      {trailing}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  )
}
