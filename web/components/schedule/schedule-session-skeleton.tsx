export function ScheduleSessionSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 h-10 w-32 rounded-full bg-muted" />
      <div className="mb-4 h-6 w-40 rounded bg-muted" />
      <div className="mb-3 h-12 max-w-3xl rounded bg-muted" />
      <div className="mb-8 flex gap-3">
        <div className="h-8 w-28 rounded-full bg-muted" />
        <div className="h-8 w-28 rounded-full bg-muted" />
        <div className="h-8 w-36 rounded-full bg-muted" />
      </div>
      <div className="space-y-3 rounded-3xl border border-border/70 bg-card p-6">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/6 rounded bg-muted" />
      </div>
      <div className="mt-8 h-56 rounded-3xl bg-muted" />
    </div>
  );
}