const Skeleton = ({ className }: { className?: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-700 leading-none">
      ‌
    </span>
  </div>
);

export default function TopCardSkeleton() {
  return (
    <div className="flex flex-row bg-gray-950 rounded-lg w-full max-w-3xl shadow-lg mb-4 items-center gap-4 border border-gray-800 hover:border-yellow-400 p-6">
      {/* Ranking Number */}
      <div className="flex items-center justify-center mr-4">
        <div className="w-8 h-6 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Poster */}
      <div className="w-24 h-36 bg-gray-800 rounded-lg animate-pulse shrink-0" />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        {/* Title and Rating */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-10" />
            <div className="w-5 h-5 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        {/* Year/Duration */}
        <div className="flex items-center gap-4 mt-2">
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>
      </div>
    </div>
  );
}
