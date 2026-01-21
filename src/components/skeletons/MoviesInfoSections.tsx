const Skeleton = ({ className }: { className?: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-700 leading-none">
      ‌
    </span>
  </div>
);

export default function MoviesInfoSectionsSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col relative items-start justify-start shrink-0 w-55"
        >
          {/* Poster */}
          <div className="w-full h-80 bg-gray-800 rounded-lg animate-pulse mb-2" />

          {/* Movie Info */}
          <div className="flex flex-col w-full gap-2 px-1">
            {/* Title */}
            <Skeleton className="h-4 w-3/4" />

            {/* Year */}
            <Skeleton className="h-3 w-12" />

            {/* Genres */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>

            {/* Rating badge (absolute) */}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-gray-950 px-2 py-1 rounded-lg">
              <div className="h-3 w-6 bg-gray-700 rounded animate-pulse" />
              <div className="w-3 h-3 bg-gray-700 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
