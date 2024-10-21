import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>SPEED</h1>
      <Link href="/login">
        <button style={{ padding: '10px 20px', fontSize: '1.2rem', marginTop: '20px', cursor: 'pointer' }}
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Login
        </button>
      </Link>
      <Link href="/viewarticle">
      <button style={{ padding: '10px 20px', fontSize: '1.2rem', marginTop: '20px', cursor: 'pointer' }}
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-gray-200 text-black gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          View article
        </button>
      </Link>
    </div>
  );
}
