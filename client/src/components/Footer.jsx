export default function Footer({navigate}){
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
      padding: '40px 24px 30px',
      marginTop: '40px'
    }}>
      <div style={{maxWidth:'1200px', margin:'0 auto'}}>
        {/* Bottom bar with Admin button */}
        <div style={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          flexWrap:'wrap',
          gap:'12px'
        }}>
          <p style={{fontSize:'12px', color:'var(--text-light)', margin:0, fontFamily:"'Radio Canada', sans-serif"}}>
            © 2026 Pavel Prihatný. Všetky práva vyhradené.
          </p>
          <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
            <button 
              onClick={()=>navigate('/admin')}
              style={{
                fontSize:'12px',
                padding:'8px 16px',
                background:'var(--color-honey)',
                color:'white',
                border:'none',
                borderRadius:'4px',
                cursor:'pointer',
                fontWeight:600,
                fontFamily:"'Radio Canada', sans-serif",
                transition:'all 200ms ease'
              }}
              onMouseEnter={(e)=>e.currentTarget.style.background='var(--color-red)'}
              onMouseLeave={(e)=>e.currentTarget.style.background='var(--color-honey)'}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
