export function SpeakerDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-background">
      <div className="hero-mesh px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 h-5 w-36 rounded bg-white/20" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="size-36 rounded-2xl bg-white/20 sm:size-40" />
            <div className="space-y-3">
              <div className="h-10 w-64 max-w-full rounded bg-white/20" />
              <div className="h-5 w-40 rounded bg-white/15" />
              <div className="h-5 w-52 rounded bg-white/15" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-48 rounded-3xl bg-muted" />
        <div className="mt-8 h-32 rounded-3xl bg-muted" />
      </div>
    </div>
  );
}