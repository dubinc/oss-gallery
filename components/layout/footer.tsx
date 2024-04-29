export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center">
      <p className="text-gray-500">
        An{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://go.oss.gallery/github"
          target="_blank"
        >
          open-source
        </a>{" "}
        project built with the{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://dub.co/blog/product-discovery-platform"
          target="_blank"
        >
          Dub API
        </a>
      </p>
    </div>
  );
}
