export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center">
      <p className="text-gray-500">
        An{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://github.com/dubinc/oss"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-source
        </a>{" "}
        project built with the{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://dub.co/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dub.co API
        </a>
      </p>
    </div>
  );
}
