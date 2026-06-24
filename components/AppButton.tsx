type AppButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export default function AppButton({
  children,
  onClick,
  disabled
}: AppButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
className="mx-auto block h-10 w-50 rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90 disabled:opacity-50"    >
      {children}
    </button>
  )
}