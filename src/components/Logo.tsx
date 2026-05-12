export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/pyd-logo.png"
        alt="Power of Youth Development"
        className="h-9 w-9 object-contain"
      />
      <div className="leading-none">
        <div className="font-display text-base font-bold tracking-tight text-foreground">PYD</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Power of Youth</div>
      </div>
    </div>
  );
}