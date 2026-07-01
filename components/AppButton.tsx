import Link from 'next/link'

type AppButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  href?: string
  className?: string
}

export default function AppButton({
  children,
  onClick,
  disabled,
  href,
  className,
}: AppButtonProps) {
  const baseClass =
    'mx-auto flex items-center justify-center h-10 w-50 rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90'
  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className ?? ''}`}>
        {children}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className ?? ''} disabled:opacity-50`}
    >
      {children}
    </button>
  )
}
