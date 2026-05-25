export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '28px 0 38px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, color: 'var(--muted)', fontSize: 14 }}>
        <span>Julian Cancelo</span>
        <span>Lanus, Buenos Aires</span>
      </div>
    </footer>
  )
}
