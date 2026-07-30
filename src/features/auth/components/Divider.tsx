// features/auth/components/Divider.tsx

interface DividerProps {
  label: string;
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-text-muted">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
