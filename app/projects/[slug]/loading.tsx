export default function ProjectLoader() {
  return (
    <>
      <div className="aspect-[4/1] w-full animate-pulse rounded-t-2xl bg-gray-100" />
      <div className="-mt-8 flex items-center justify-between px-4 sm:-mt-12 sm:items-end md:pr-0">
        <div className="h-16 w-16 rounded-full bg-white p-2 sm:h-24 sm:w-24">
          <div className="h-full w-full animate-pulse rounded-full bg-gray-100" />
        </div>
        <div className="flex items-center space-x-2 py-2">
          <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-100" />
          <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-100" />
        </div>
      </div>
      <div className="max-w-lg p-4">
        <div className="h-12 w-40 animate-pulse rounded-lg bg-gray-100" />
        <div className="mt-2 h-32 w-full animate-pulse rounded-lg bg-gray-100" />
      </div>
    </>
  );
}
