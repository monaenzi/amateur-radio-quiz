type AppButtonProps = {
  children: React.ReactNode;
};

export default function AppButton({ children }: AppButtonProps) {
  return (
    <button className="w-full rounded-full bg-[#008CEA] py-4 font-bold text-white transition hover:opacity-90">
      {children}
    </button>
  );
}