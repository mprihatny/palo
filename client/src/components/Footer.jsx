import React from 'react'

export default function Footer({navigate}){
  return (
    <footer style={{
      borderTop: '2px solid var(--color-honey)',
      background: '#40332D',
      padding: '48px 24px 32px',
      marginTop: '60px'
    }}>
      <div style={{maxWidth:'1200px', margin:'0 auto'}}>
        {/* Main footer content */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'48px', marginBottom:'48px'}}>
          {/* Useful links */}
          <div>
            <h3 style={{fontSize:'18px', fontWeight:600, marginBottom:'16px', fontFamily:"'Hahmlet', serif", color:'var(--color-light)'}}>Užitočné odkazy</h3>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              <a href="https://kapucini.sk" target="_blank" rel="noopener noreferrer" style={{fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                → Kapucíni.sk
              </a>
              <a href="#" style={{fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                → Newsletter
              </a>
              <a href="#" style={{fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                → Kontakt
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{fontSize:'18px', fontWeight:600, marginBottom:'16px', fontFamily:"'Hahmlet', serif", color:'var(--color-light)'}}>Navigácia</h3>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              <a onClick={()=>navigate('/')} style={{cursor:'pointer', fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                → Domov
              </a>
              <a onClick={()=>navigate('/projects?cat=Autorské texty')} style={{cursor:'pointer', fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                → Obsah
              </a>
              <a onClick={()=>navigate('/admin')} style={{cursor:'pointer', fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                →Admin
              </a>
            </div>
          </div>

          {/* Blog */}
          <div>
            <h3 style={{fontSize:'18px', fontWeight:600, marginBottom:'16px', fontFamily:"'Hahmlet', serif", color:'var(--color-light)'}}>Blog</h3>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              <a href="#" style={{fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                → Najnovšie príspěvky
              </a>
              <a href="#" style={{fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                → Archív
              </a>
              <a href="#" style={{fontSize:'14px', color:'var(--text-light)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", transition:'color 200ms', display:'flex', alignItems:'center', gap:'6px'}} onMouseEnter={(e)=>e.target.style.color='var(--color-honey)'} onMouseLeave={(e)=>e.target.style.color='var(--text-light)'}>
                → RSS
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
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
            © 2026 Všetky práva vyhradené.
          </p>
          <a 
            onClick={()=>window.location.href = 'mailto:pavel@kapucini.sk'}
            style={{fontSize:'13px', color:'var(--color-honey)', textDecoration:'none', fontFamily:"'Radio Canada', sans-serif", cursor:'pointer', transition:'color 200ms'}} 
            onMouseEnter={(e)=>e.target.style.color='var(--color-red)'}
            onMouseLeave={(e)=>e.target.style.color='var(--color-honey)'}
          >
            pavel@kapucini.sk
          </a>
        </div>
      </div>
    </footer>
  )
}
