import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>SPEED</h1>
      <Link href="/login">
        <button style={{ padding: '10px 20px', fontSize: '1.2rem', marginTop: '20px', cursor: 'pointer' }}>
          Login
        </button>
      </Link>
    </div>
  );
}
