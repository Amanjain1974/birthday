export default function NotFound() {
  return (
    <div className="screen active" style={{ background: 'var(--cream)' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <div className="icon">🎈</div>
        <h2>Oops!</h2>
        <p>This link seems to have floated away.</p>
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ink-soft)' }}>
          Check the URL and try again.
        </p>
      </div>
    </div>
  );
}
