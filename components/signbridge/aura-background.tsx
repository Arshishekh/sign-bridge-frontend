import Image from 'next/image'

export function AuraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src="/images/hero-hand.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[30%_center] opacity-70 lg:object-center lg:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020b08]/90 via-[#020b08]/30 to-[#020b08]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b08]/80 via-transparent to-[#020b08]/60" />

      <div className="absolute -left-32 top-1/3 size-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute left-[38%] top-[20%] size-[520px] rounded-full bg-lime/10 blur-3xl" />
      <div className="absolute right-[5%] top-[18%] size-[460px] rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-lime/10 blur-3xl" />
    </div>
  )
}
