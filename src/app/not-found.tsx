import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-6xl font-bold text-blue-primary-darker mb-4">404</h1>
      <p className="text-xl text-white mb-8">
        Oops, this page doesn&apos;t exist
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-primary-darker text-white rounded-lg font-semibold hover:bg-blue-primary-darker-100 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
