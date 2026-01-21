const Skeleton = ({ className }: { className?: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-700 leading-none">
      ‌
    </span>
  </div>
);

export default function MoviesCardSkeleton() {
  return (
    <div className="flex flex-col items-center p-2 hover:-translate-y-1 transition-transform">
      {/* Poster */}
      <div className="w-full aspect-2/3 bg-gray-800 rounded-lg animate-pulse mb-2" />

      {/* Title */}
      <Skeleton className="h-4 w-3/4 mb-1" />

      {/* Year */}
      <Skeleton className="h-3 w-12 mb-1" />

      {/* Genres */}
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
