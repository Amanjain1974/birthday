import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
      <h1>Birthday App</h1>
      <Link href="/admin" style={{ padding: '12px 24px', background: '#E8998D', color: '#fff', textDecoration: 'none', borderRadius: '100px' }}>
        Go to Creator Dashboard
      </Link>
    </div>
  );
}
