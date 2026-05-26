import React, {useState} from 'react'

export default function Navbar({navigate, currentRoute}){
  const [menuOpen, setMenuOpen] = useState(false)
  
  const navItems = [
    { label: 'Domov', path: '/' },
    { label: 'Autorské texty', path: '/projects?cat=Autorské texty' },
    { label: 'Preklady', path: '/projects?cat=Preklady' },
    { label: 'Pripravované', path: '/projects?cat=Pripravované' }
  ]

  const handleNavClick = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <nav style={{
      background: 'var(--bg)',
      padding: '12px clamp(12px, 3vw, 24px)',
      borderBottom: 'none',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'none'
    }}>
      <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        {/* Logo */}
        <div 
          onClick={()=>handleNavClick('/')}
          style={{cursor:'pointer', display:'flex', alignItems:'center'}}
        >
          <img 
            src="https://i.postimg.cc/T3WJq6ps/image-removebg-preview-(1).png" 
            alt="Logo"
            style={{height:'48px', width:'auto'}}
          />
        </div>

        {/* Navigation items - Desktop */}
        <div style={{display:'none', gap:'clamp(16px, 3vw, 32px)', alignItems:'center'}} className="navbar-desktop">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              onClick={()=>handleNavClick(item.path)}
              style={{
                cursor:'pointer',
                fontSize:'clamp(12px, 2vw, 14px)',
                fontWeight:600,
                color: currentRoute === item.path ? 'var(--color-honey)' : 'var(--text)',
                textDecoration:'none',
                fontFamily:"'Radio Canada', sans-serif",
                transition:'color 200ms ease',
                borderBottom: 'none',
                paddingBottom:'4px',
                whiteSpace:'nowrap'
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.color = 'var(--color-honey)'}}
              onMouseLeave={(e)=>{
                if(currentRoute !== item.path) {
                  e.currentTarget.style.color = 'var(--text)'
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Hamburger Menu - Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display:'none',
            flexDirection:'column',
            gap:'6px',
            background:'none',
            border:'none',
            cursor:'pointer',
            padding:'8px',
            '@media (maxWidth: 768px)': {display:'flex'}
          }}
          className="hamburger-toggle"
        >
          <span style={{
            width:'28px',
            height:'3px',
            background:'var(--text)',
            borderRadius:'2px',
            transition:'all 300ms ease',
            transform: menuOpen ? 'rotate(45deg) translate(10px, 10px)' : 'none'
          }}/>
          <span style={{
            width:'28px',
            height:'3px',
            background:'var(--text)',
            borderRadius:'2px',
            transition:'all 300ms ease',
            opacity: menuOpen ? 0 : 1
          }}/>
          <span style={{
            width:'28px',
            height:'3px',
            background:'var(--text)',
            borderRadius:'2px',
            transition:'all 300ms ease',
            transform: menuOpen ? 'rotate(-45deg) translate(8px, -8px)' : 'none'
          }}/>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          display:'flex',
          flexDirection:'column',
          gap:'clamp(12px, 3vw, 16px)',
          padding:'clamp(12px, 3vw, 24px)',
          background:'rgba(212, 148, 95, 0.05)',
          borderTop:'1px solid var(--border)',
          marginTop:'12px',
          animation:'slideDown 300ms ease'
        }}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              onClick={()=>handleNavClick(item.path)}
              style={{
                cursor:'pointer',
                fontSize:'clamp(14px, 3vw, 16px)',
                fontWeight:600,
                color: currentRoute === item.path ? 'var(--color-honey)' : 'var(--text)',
                textDecoration:'none',
                fontFamily:"'Radio Canada', sans-serif",
                transition:'color 200ms ease',
                paddingLeft:'12px',
                borderLeft: currentRoute === item.path ? '3px solid var(--color-honey)' : 'none'
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.color = 'var(--color-honey)'}}
              onMouseLeave={(e)=>{
                if(currentRoute !== item.path) {
                  e.currentTarget.style.color = 'var(--text)'
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
