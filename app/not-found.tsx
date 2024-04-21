import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h1 className="font-display text-3xl">404</h1>
      <Link
        href="/"
        className="flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-gray-100 px-7 py-2 transition-colors hover:bg-gray-50"
      >
        <p className="text-sm font-semibold text-gray-600">Go back home</p>
      </Link>
    </div>
  );
}
