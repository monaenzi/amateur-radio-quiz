type AppButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export default function AppButton({
  children,
  onClick,
}: AppButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-14 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90"
    >
      {children}
    </button>
  )
}