export function QuoteContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-center gap-2 w-full bg-[#04f7ff4b] italic p-8 border-1 border-black rounded-lg
      duration-300 hover:bg-[#04f7ff93]"
    >
      {children}
    </div>
  );
}
