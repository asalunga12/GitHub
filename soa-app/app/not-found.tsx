import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl font-bold text-green-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">The SOA or page you are looking for does not exist.</p>
        <Link href="/" className="btn-primary py-2 px-6">
          Go Home
        </Link>
      </div>
    </div>
  );
}
