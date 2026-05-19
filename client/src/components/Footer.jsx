export default function Footer({navigate}){
  return (
    <footer style={{
      borderTop: '2px solid var(--color-honey)',
      background: 'var(--bg)',
      padding: '60px 24px 40px',
      marginTop: '60px'
    }}>
      <div style={{maxWidth:'1200px', margin:'0 auto'}}>
        {/* Main footer content - Left logo + Right links */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 2fr',
          gap:'60px',
          marginBottom:'48px',
          alignItems:'flex-start'
        }}>
          {/* Left: Logo + Name + Divider */}
          <div style={{display:'flex', flexDirection:'column', gap:'20px', alignItems:'flex-start'}}>
            <img 
              src="https://i.postimg.cc/43cbVCzM/logop-removebg-preview.png" 
              alt="Logo"
              style={{height:'50px', width:'auto'}}
            />
            <div>
              <h3 style={{fontSize:'20px', fontWeight:600, margin:'0 0 4px 0', fontFamily:"'Hahmlet', serif", color:'var(--color-dark)'}}>Kapucín</h3>
            </div>
            <div style={{width:'40px', height:'2px', background:'var(--color-honey)', marginTop:'8px'}}></div>
          </div>

          {/* Right: Užitočné odkazy */}
          <div>
            <h3 style={{fontSize:'16px', fontWeight:600, marginBottom:'16px', fontFamily:"'Hahmlet', serif", color:'var(--color-dark)'}}>Užitočné odkazy</h3>
            <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
              <a href="https://kapucini.sk" target="_blank" rel="noopener noreferrer" style={{fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms ease'}} onMouseEnter={(e)=>e.currentTarget.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>
                Kapucíni.sk
              </a>
              <a href="#" style={{fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms ease'}} onMouseEnter={(e)=>e.currentTarget.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.currentTarget.style.color='var(--text-light)'}>
                Kontakt
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar with Admin button */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '24px',
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          flexWrap:'wrap',
          gap:'16px'
        }}>
          <p style={{fontSize:'13px', color:'var(--text-light)', margin:0, fontFamily:"'Radio Canada', sans-serif"}}>
            © 2026 Pavel Prihatný. Všetky práva vyhradené.
          </p>
          <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
            <button 
              onClick={()=>navigate('/admin')}
              style={{
                fontSize:'13px',
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
