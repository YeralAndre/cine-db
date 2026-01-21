const Skeleton = ({ className }: { className?: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-500 leading-none">
      ‌
    </span>
    <br />
  </div>
);

export default function MovieDetailsSkeleton() {
  return (
    <div className="p-4 mb-10 mt-25 flex flex-col items-center gap-4 w-full mx-auto">
      {/* Poster + Info */}
      <div className="flex flex-row gap-10 w-full max-w-5xl mx-auto mb-5">
        {/* Poster */}
        <div className="w-100 h-150 bg-gray-800 rounded-lg animate-pulse shrink-0" />

        {/* Info */}
        <div className="flex flex-col gap-4 flex-1">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />

          <div className="flex gap-4 mt-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="flex gap-2 mt-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
      {/* Trailer */}
      <div className="w-full max-w-5xl">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="w-full h-96 bg-gray-800 rounded-lg animate-pulse" />
      </div>
      {/* Divider */}
      <div className="h-px w-3/5 bg-gray-700 my-8" />
      {/* Similar Movies */}
      <div className="w-full max-w-5xl">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="flex gap-4 overflow-x-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-55 shrink-0">
              <div className="w-full h-80 bg-gray-800 rounded-lg animate-pulse mb-2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2 mt-2" />
            </div>
          ))}
        </div>
      </div>
      {/* Recommended Movies */}
      <div className="w-full max-w-5xl mt-8">
        <Skeleton className="h-8 w-56 mb-4" />
        <div className="flex gap-4 overflow-x-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-55 shrink-0">
              <div className="w-full h-80 bg-gray-800 rounded-lg animate-pulse mb-2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
